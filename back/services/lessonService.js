const mongoose = require('mongoose');
const lessonDAO = require('../dao/lessonDAO');
const enrollmentService = require('./enrollmentService')
const Subject = require('../models/subjectModel');
const {
    validateCreateLesson,
    validateUpdateLesson
} = require('../utils/validators/lessonValidators');

const { Types } = mongoose;

// Helper function to build date range
const buildDateRange = (dateString, range = 'day') => {
    const date = new Date(dateString);
    if (isNaN(date)) return null;

    let start = new Date(date);
    let end = new Date(date);

    switch (range) {
        case 'week': {
            const day = start.getUTCDay(); // 0 (Sun) - 6 (Sat)
            const diffToMonday = (day === 0 ? -6 : 1 - day);
            start.setUTCDate(start.getUTCDate() + diffToMonday);
            start.setUTCHours(0, 0, 0, 0);

            end = new Date(start);
            end.setUTCDate(start.getUTCDate() + 7);
            break;
        }

        case 'month': {
            start = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1, 0, 0, 0, 0));
            end = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 1, 0, 0, 0, 0));
            break;
        }

        case 'day':
        default: {
            start.setUTCHours(0, 0, 0, 0);
            end = new Date(start);
            end.setUTCDate(start.getUTCDate() + 1);
            break;
        }
    }

    return { $gte: start, $lt: end };
};

const buildLessonFilters = async (query) => {
    const filters = {};

    if (query.subject && Types.ObjectId.isValid(query.subject))
        filters.subject = new Types.ObjectId(query.subject);

    if (query.student && Types.ObjectId.isValid(query.student)) {
        const subjectIds = await enrollmentService.getSubjectIdsByStudent(query.student);
        filters.subject = { $in: subjectIds };
    }

    if (query.teacher && Types.ObjectId.isValid(query.teacher)) {
        const subjects = await Subject.find({ teacher: query.teacher }).select('_id');
        const subjectIds = subjects.map(s => s._id);
        filters.subject = { $in: subjectIds };
    }

    if (query.type)
        filters.type = new RegExp(`^${query.type}$`, 'i');

    if (query.date) {
        const range = query.range || 'month';
        const dateFilter = buildDateRange(query.date, range);
        if (dateFilter)
            filters.startsAt = dateFilter;
    }

    return filters;
};

const getLessons = async (query, /*currentUser*/) => {
    const filters = await buildLessonFilters(query);

    // if (currentUser.role == 'student')
    //     filters.student = currentUser._id;

    return await lessonDAO.getLessons(filters);
}

const getLessonById = async (id) => {
    return await lessonDAO.getLessonById(id);
}

const createLesson = async (lessonData) => {
    await validateCreateLesson(lessonData);
    return await lessonDAO.createLesson(lessonData);
}

const updateLesson = async (id, lessonData) => {
    if (await getLessonById(id) === null)
        throw new Error(`Invalid data: cannot update non-existing lesson`);    
    validateUpdateLesson(lessonData);
    return await lessonDAO.updateLesson(id, lessonData);
}

const deleteLesson = async (id) => {
    const result = await lessonDAO.deleteLesson(id);
    if (!result) 
        throw new Error('Lesson not found');

    return {message: 'Lesson deleted successfully'};
}

module.exports = {
    getLessons,
    getLessonById,
    createLesson,
    updateLesson,
    deleteLesson
};