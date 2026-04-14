const lessonController = require("../controllers/lessonController");
const express = require('express');

const router = express.Router();

router.get('/', lessonController.getLessons);
router.get('/:id', lessonController.getLessonById);
router.post('/', lessonController.createLesson);
router.patch('/:id', lessonController.updateLesson);
router.delete('/:id', lessonController.deleteLesson);

module.exports = router;