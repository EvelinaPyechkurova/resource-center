const lessonService = require('../services/lessonService');
const mongoose = require('mongoose');

const getLessons = async (req, res) => {
    try {
        const lessons = await lessonService.getLessons(req.query);
        res.status(200).json(lessons);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getLessonById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).json({ error: `${id} is invalid ID address` });

        const lesson = await lessonService.getLessonById(id);

        if (lesson)
            res.status(200).json(lesson);
        else
            res.status(404).json({ error: `lesson with ID ${id} not found` });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createLesson = async (req, res) => {
    try {
        const lesson = req.body;
        await lessonService.createLesson(lesson);
        res.status(201).json({ message: 'Lesson created successfully' });
    } catch (error) {
        res.status(400).json({ error });
    }
};

const updateLesson = async (req, res) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).json({ error: `${id} is invalid ID address` });

        const existingLesson = await lessonService.getLessonById(id);

        if (!existingLesson)
            return res.status(404).json({ error: `lesson with ID ${id} not found` });

        const lesson = req.body;
        await lessonService.updateLesson(id, lesson);
        res.status(200).json({ message: 'Lesson updated successfully' });
    } catch (error) {
        res.status(400).json({ error });
    }
};

const deleteLesson = async (req, res) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).json({ error: `${id} is invalid ID address` });

        const existingLesson = await lessonService.getLessonById(id);

        if (!existingLesson)
            return res.status(404).json({ error: `lesson with ID ${id} not found` });

        await lessonService.deleteLesson(id);
        res.status(200).json({ message: 'Lesson deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getLessons,
    getLessonById,
    createLesson,
    updateLesson,
    deleteLesson
};