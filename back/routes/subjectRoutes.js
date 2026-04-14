const subjectController = require('../controllers/subjectController');
const express = require('express');

const router = express.Router();

router.get('/', subjectController.getSubjects);
router.get('/:id', subjectController.getSubjectById);
router.post('/', subjectController.createSubject);
router.patch('/:id', subjectController.updateSubject);
router.delete('/:id', subjectController.deleteSubject);

module.exports = router;