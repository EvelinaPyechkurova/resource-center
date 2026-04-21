const mongoose = require('mongoose');
const User = require('../../models/userModel');
const Subject = require('../../models/subjectModel');
const {
    invalidObjectMessage
} = require('./basicValidators');
const ValidationError = require('../errors/ValidationError');


// Helper validators used for Enrollment fields
const validStudent = async (student) => {
    if (!mongoose.Types.ObjectId.isValid(student))
        return false;

    const user = await User.findById(student);
    return user && user.role === 'student';
};

const validSubject = async (subject) => {
    if (!mongoose.Types.ObjectId.isValid(subject))
        return false;

    return !!(await Subject.exists({ _id: subject }));
};


// Error messages for Enrollment fields
const invalidStudentMessage = 'Student must exist and have role "student"';
const invalidSubjectMessage = 'Subject must exist';


// Actual validator for creating Enrollment
const validateCreateEnrollment = async (enrollment) => {
    const errors = {};

    if (!enrollment || typeof enrollment !== 'object' || Object.keys(enrollment).length !== 2)
        errors.general = invalidObjectMessage('Enrollment');

    const { student, subject } = enrollment;

    if (!(await validStudent(student)))
        errors.student = invalidStudentMessage;

    if (!(await validSubject(subject)))
        errors.subject = invalidSubjectMessage;

    if (Object.keys(errors).length > 0)
        throw new ValidationError('Validation failed for creating enrollment', errors);
};


module.exports = {
    validateCreateEnrollment
};