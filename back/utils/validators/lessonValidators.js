const mongoose = require('mongoose');
const Subject = require('../../models/subjectModel');
const {
    notEmptyString,
    invalidObjectMessage
} = require('./basicValidators');
const { LESSON_TYPE_VALUES } = require('../constants');
const ValidationError = require('../errors/ValidationError');


// Helper validators used for Lesson model fields
const validSubject = async (subject) => {
    if(!mongoose.Types.ObjectId.isValid(subject))
        return false;
    return !!(await Subject.exists({_id: subject}));
}

const validType = (type) => {
    return notEmptyString(type) && LESSON_TYPE_VALUES.includes(type);
}

const validDate = (date) => {
    const parsedDate = typeof date === 'string' ? new Date(date) : date;
    return parsedDate instanceof Date && !isNaN(parsedDate.getTime());
}

// Error messages for Lesson fields
const invalidSubjectMessage = 'Cannot create lesson for not existing subject';
const invalidTypeMessage = `Type of lesson must be one of ${LESSON_TYPE_VALUES.join(", ")}`;
const invalidDateMessage = 'Invalid date format or value';


// Actual validators for creating and updating Lesson
const validateCreateLesson = async (lesson) => {
    let errors = {};

    if (!lesson || typeof lesson !== 'object' || Object.keys(lesson).length !== 3)
        errors.general = invalidObjectMessage('Lesson')

    const {subject, type, startsAt} = lesson;

    if (!(await validSubject(subject)))
        errors.subject = invalidSubjectMessage;
    if (!validType(type))
        errors.type = invalidTypeMessage;
    if (!validDate(startsAt))
        errors.startsAt = invalidDateMessage;

    if (Object.keys(errors).length > 0)
        throw new ValidationError("Validation failed for creating lesson", errors);
}

const validateUpdateLesson = (lesson) => {
    const allowedFields = ['type', 'startsAt'];
    const errors = {};

    const fields = Object.keys(lesson);
    const invalidFields = fields.filter(field => !allowedFields.includes(field));

    if (invalidFields.length > 0)
        errors.invalidFields = `Invalid fields in the update: ${invalidFields.join(", ")}`;

    if ('type' in lesson && !validType(lesson.type))
        errors.type = invalidTypeMessage;

    if ('startsAt' in lesson && !validDate(lesson.startsAt))
        errors.startsAt = invalidDateMessage;

    if (Object.keys(errors).length > 0)
        throw new ValidationError('Validation failed for updating lesson', errors);
}


module.exports = {
    validateCreateLesson,
    validateUpdateLesson
}