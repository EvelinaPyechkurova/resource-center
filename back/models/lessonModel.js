const mongoose = require('mongoose');
const { LESSON_TYPE_VALUES } = require('../utils/constants');
const { emptyFieldMessage } = require('../utils/validators//basicValidators');

const lessonSchema = new mongoose.Schema({
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, emptyFieldMessage('Subject', 'lesson')]
    },
    type: {
        type: String,
        required: [true, emptyFieldMessage('Type', 'lesson')],
        enum: LESSON_TYPE_VALUES
    },
    startsAt: {
        type: Date,
        required: [true, emptyFieldMessage('Starts at', 'lesson')]
    }
});

module.exports = mongoose.model('Lesson', lessonSchema);