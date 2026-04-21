const mongoose = require('mongoose');
const subjectDAO = require('../dao/subjectDAO');
const enrollmentService = require('/enrollmentService')
const { validateCreateSubject, validateUpdateSubject } = require('../utils/validators/subjectValidators');
const { existLessonsForThisSubject, existEnrollmentsForThisSubject } = require('../utils/constraints');

const { Types } = mongoose;

const buildSubjectFilters = async (query, /*userId*/) => {
    const filters = {};

    if (query.student && Types.ObjectId.isValid(query.student)) {
        const subjectIds = await enrollmentService.getSubjectIdsByStudent(query.student);
        filters._id = { $in: subjectIds };
    }

    if (query.teacher && Types.ObjectId.isValid(query.teacher))
        filters.teacher = new Types.ObjectId(query.teacher);

    if (query.name)
        filters.name = new RegExp(query.name, 'i');

    if (query.year)
        filters.year = Number(query.year);

    if (query.trimester)
        filters.trimester = new RegExp(`^${query.trimester}$`, 'i')

    return filters;
}

const getSubjects = async (query, /*currentUser*/) => {
    const filters = await buildSubjectFilters(query);

    // if (currentUser.role == 'student')
    //     filters.student = currentUser._id;

    return await subjectDAO.getSubjects(filters);
}

const getSubjectById = async (id) => {
    return await subjectDAO.getSubjectById(id);
}

const createSubject = async (subjectData) => {
    await validateCreateSubject(subjectData);
    return await subjectDAO.createSubject(subjectData);
}

const updateSubject = async (id, subjectData) => {
    if (await getSubjectById(id) === null)
        throw new Error('Invalid data: cannot update non-existing subject');    
    validateUpdateSubject(subjectData);
    return await subjectDAO.updateSubject(id, subjectData);
}

const deleteSubject = async (id) => {
    const hasLessons = await existLessonsForThisSubject(id);
    if (hasLessons)
        throw new Error('Cannot delete subject with associated lessons.');

    const hasEnrollments = await existEnrollmentsForThisSubject(id);
    if (hasEnrollments)
        throw new Error('Cannot delete subject with enrolled students.');

    const result = await subjectDAO.deleteSubject(id);

    if (!result)
        throw new Error('Subject not found');

    return { message: 'Subject deleted successfully' };
};

module.exports = {
    getSubjects,
    getSubjectById,
    createSubject,
    updateSubject,
    deleteSubject
};