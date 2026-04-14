const Subject = require('../models/subjectModel');
const Lesson = require('../models/lessonModel');
const { existLessonsForThisSubject } = require('../utils/constraints');


const getSubjects = async (filters = {}) => {
    try {
        return await Subject.find(filters);
    } catch (error) {
        console.error(`Error retrieving subjects with filters ${JSON.stringify(filters)}:`, error);
    }
}

const getSubjectById = async (id) => {
    try {
        return await Subject.findById(id);
    } catch (error) {
        console.error(`Error retrieving subject by ID ${id}:`, error);
        throw error;
    }
}

const getSubjectsByStudent = async (studentId) => {
    try {
        const lessons = await Lesson.find({ student: studentId }).select('subject');
        const subjectIds = [...new Set(lessons.map(lesson => lesson.subject))];
        return await Subject.find({_id : {$in: subjectIds}});
    } catch(error) {
        console.error(`Error retrieving subjects by teacher with ID ${teacherId}:`, error);
        throw error;
    }
}

const createSubject = async (subjectData) => {
    try {
        return await Subject.create(subjectData);
    } catch (error) {
        console.error('Error creating subject:', error);
        throw error;
    }
}

const updateSubject = async (id, subjectData) => {
    try {
        return await Subject.findByIdAndUpdate(id, subjectData, {new: true, runValidators: true});
    } catch (error) {
        console.error(`Error updating subject with ID ${id}:`, error);
        throw error;
    }
}

const deleteSubject = async (id) => {
    try {
        // const hasLessons = await existLessonsForThisSubject(id);
        // if (hasLessons) 
        //     throw new Error("Cannot delete subject with associated lessons.");
        
        return await Subject.findByIdAndDelete(id);
    } catch (error) {
        console.error(`Error deleting subject with ID ${id}:`, error);
        throw error;
    }
}

module.exports = {
    getSubjects,
    getSubjectById,
    getSubjectsByStudent,
    createSubject,
    updateSubject,
    deleteSubject
};