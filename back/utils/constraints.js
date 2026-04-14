const Subject = require('../models/subjectModel');
const Lesson = require('../models/lessonModel');

const existSubjectsForThisStudent = async (id) => {
    const subjectCount = await Subject.countDocuments({ student: id });
    return subjectCount > 0;
}

const existLessonsForThisSubject = async (id) => {
    const lessonCount = await Lesson.countDocuments({ subject: id });
    return lessonCount > 0;
}

module.exports = {
    existSubjectsForThisStudent,
    existLessonsForThisSubject
};