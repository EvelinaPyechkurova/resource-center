const mongoose = require('mongoose');
const enrollmentDAO = require('../dao/enrollmentDAO');

const { Types } = mongoose;

const getSubjectIdsByStudent = async (studentId) => {
    if (!Types.ObjectId.isValid(studentId))
        return [];

    const enrollments = await enrollmentDAO.getEnrollments({
        student: studentId
    });

    return enrollments.map(e => e.subject);
};

const getStudentIdsBySubject = async (subjectId) => {
    if (!Types.ObjectId.isValid(subjectId))
        return [];

    const enrollments = await enrollmentDAO.getEnrollments({
        subject: subjectId
    });

    return enrollments.map(e => e.student);
};

const isStudentEnrolled = async (studentId, subjectId) => {
    const existing = await enrollmentDAO.getEnrollments({
        student: studentId,
        subject: subjectId
    });

    return existing.length > 0;
};

const enrollStudent = async (studentId, subjectId) => {
    const alreadyEnrolled = await isStudentEnrolled(studentId, subjectId);

    if (alreadyEnrolled)
        throw new Error('Student already enrolled in this subject');

    return await enrollmentDAO.createEnrollment({
        student: studentId,
        subject: subjectId
    });
};

const removeEnrollment = async (studentId, subjectId) => {
    return await enrollmentDAO.deleteByStudentAndSubject(studentId, subjectId);
};

module.exports = {
    getSubjectIdsByStudent,
    getStudentIdsBySubject,
    isStudentEnrolled,
    enrollStudent,
    removeEnrollment
};