const mongoose = require('mongoose');
const User = require('../../models/userModel');
const {
    TRIMESTER_TYPE_VALUES,
    MIN_VALID_YEAR,
    MAX_VALID_YEAR,
} = require('../constants');
const {
    notEmptyString,
    requiredLetterField,
    invalidObjectMessage
} = require('./basicValidators');
const ValidationError = require('../errors/ValidationError');


// Helper validators used for Subject model fields
const validStudent = async (student) => {
    if(!mongoose.Types.ObjectId.isValid(student))
        return false;
    return !!(await User.exists({_id: student}));
}

const validYear = (year) => {
    return year && typeof year === 'number'
    && year >= MIN_VALID_YEAR && year <= MAX_VALID_YEAR;
}

const validTrimester = (trimester) => {
    return notEmptyString(trimester) && TRIMESTER_TYPE_VALUES.includes(trimester);
}


// Error messages Subject model fields
const invalidYearMessage = `year must be present, number and in [${MIN_VALID_YEAR}, ${MAX_VALID_YEAR}]`;
const invalidTrimesterMessage = `trimester must be present and be one of values ${TRIMESTER_TYPE_VALUES.join(', ')}`;
const invalidStudentMessage = 'Cannot create subject for non-existing student'


// Actual validators for creating and updating Subject model
const validateCreateSubject = async (subject) => {
    const errors = {};

    if (!subject || typeof subject !== 'object' || Object.keys(subject).length !== 4)
        errors.general = invalidObjectMessage('Subject')

    const { student, name, year, trimester } = subject;

    if (!(await validStudent(student)))
        errors.student = invalidStudentMessage
    const nameError = requiredLetterField(name, 'Name');
    if (nameError)
        errors.name = nameError;
    if (!validYear(year)) 
        errors.year = invalidYearMessage;
    if (!validTrimester(trimester))
        errors.trimester = invalidTrimesterMessage;

    if (Object.keys(errors).length > 0)
        throw new ValidationError('Validation failed for creating subject', errors);
}

const validateUpdateSubject = (subject) => {
    const allowedFields = ['name', 'year', 'trimester'];
    const errors = {};
    
    const invalidFields = Object.keys(subject)
        .filter(field => !allowedFields.includes(field));

    if (invalidFields.length > 0)
        errors.invalidFields = `Invalid fields in the update: ${invalidFields.join(', ')}`;

    if ('name' in subject) {
        const error = requiredLetterField(subject.name)
        if (error) errors.surname = error;
    }

    if ('year' in subject && !validYear(subject.year))
        errors.year = invalidYearMessage;

    if ('trimester' in subject && !validTrimester(subject.trimester))
        errors.trimester = invalidTrimesterMessage;

    if (Object.keys(errors).length > 0)
        throw new ValidationError('Validation failed for updating subject', errors);
}


module.exports = {
    validateCreateSubject,
    validateUpdateSubject
};