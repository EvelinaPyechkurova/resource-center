const subjectService = require('../services/subjectService');
const mongoose = require('mongoose');

const getSubjects = async (req, res) => {
    try {
        const subjects = await subjectService.getSubjects(req.query);
        res.status(200).json(subjects);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
}

const getSubjectById = async (req, res) => {
    try {
        const id = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).json({ error: `${id} is invalid ID address` });
        const subject = await subjectService.getSubjectById(id);

        if(subject)
            res.status(200).json(subject);
        else
            res.status(404).json({ error: `subject with ID ${id} not found` });
        
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
}

const createSubject = async (req, res) => {
    try {
        const subject = req.body;
        await subjectService.createSubject(subject);
        res.status(201).json({ message: 'Subject created successfully' });
    } catch(error) {
        res.status(400).json({ error });
    }
}

const updateSubject = async (req, res) => {
    try {
        const id = req.params.id;
        const existingSubject = await subjectService.getSubjectById(id);

        if(!existingSubject)
            return res.status(404).json({ error: `Subject with ID ${id} not found` });

        const subject = req.body;
        await subjectService.updateSubject(id, subject);
        res.status(200).json({ message: 'Subject updated successfully' });
    } catch(error) {
        res.status(400).json({ error });
    }
}

const deleteSubject = async (req, res) => {
    try {
        const id = req.params.id;
        const existingSubject = await subjectService.getSubjectById(id);
        if(!existingSubject)
            return res.status(404).json({ error: `Subject with ID ${id} not found` });

        await subjectService.deleteSubject(id);
        res.status(200).json({ message: 'Subject deleted successfully' });
    } catch(error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getSubjects,
    getSubjectById,
    createSubject,
    updateSubject,
    deleteSubject
}