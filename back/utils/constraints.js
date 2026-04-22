const Enrollment = require('../models/enrollmentModel');
const Lesson = require('../models/lessonModel');
const Subject = require('../models/subjectModel');


// subject → lessons
const existLessonsForThisSubject = async (subjectId) => {
    const count = await Lesson.countDocuments({ subject: subjectId });
    return count > 0;
};

// subject → enrollments
const existEnrollmentsForThisSubject = async (subjectId) => {
    const count = await Enrollment.countDocuments({ subject: subjectId });
    return count > 0;
};

// student → enrollments
const existEnrollmentsForThisStudent = async (studentId) => {
    const count = await Enrollment.countDocuments({ student: studentId });
    return count > 0;
};

// teacher → subjects
const existSubjectsForThisTeacher = async (teacherId) => {
    const count = await Subject.countDocuments({ teacher: teacherId });
    return count > 0;
};

module.exports = {
    existLessonsForThisSubject,
    existEnrollmentsForThisSubject,
    existEnrollmentsForThisStudent,
    existSubjectsForThisTeacher
};