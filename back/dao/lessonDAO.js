const Lesson = require('../models/lessonModel');

const getLessons = async (filters = {}) => {
    try {
        return await Lesson.find(filters);
    } catch (error) {
        console.error(`Error retrieving lesson with filters ${JSON.stringify(filters)}:`, error);
    }
}

const getLessonById = async (id) => {
    try {
        return await Lesson.findById(id);
    } catch (error) {
        console.error(`Error retrieving lesson by ID ${id}: ${error}`);
        throw error;
    }
}

const createLesson = async (lessonData) => {
    try {
        return await Lesson.create(lessonData);
    } catch (error) {
        console.error(`Error creating lesson: ${error}`);
        throw error;
    }
}

const updateLesson = async (id, lessonData) => {
    try {
        return await Lesson.findByIdAndUpdate(id, lessonData, {new: true});
    } catch (error) {
        console.error(`Error updating lesson with ID ${id}:`, error);
        throw error;
    }
}

const deleteLesson = async (id) => {
    try{
        return await Lesson.findByIdAndDelete(id);
    }catch (error){
        console.error(`Error deleting lesson with ID ${id}:`, error);
        throw error;
    }
}

module.exports = {
    getLessons,
    getLessonById,
    createLesson,
    updateLesson,
    deleteLesson
};