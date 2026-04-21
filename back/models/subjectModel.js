const mongoose = require('mongoose');
const { 
    TRIMESTER_TYPE_VALUES,
    MIN_VALID_YEAR,
    MAX_VALID_YEAR
} = require('../utils/constants');
const { emptyFieldMessage } = require('../utils/validators/basicValidators');


const subjectSchema = new mongoose.Schema({
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, emptyFieldMessage('Teacher', 'subject')]
    },
    name: {
        type: String,
        required: [true, emptyFieldMessage('Name', 'subject')],
        minlength: 2,
        maxlength: 50,
        lowercase: true,
    },
    year: {
        type: Number,
        required: [true, emptyFieldMessage('Year', 'subject')],
        min: MIN_VALID_YEAR,
        max: MAX_VALID_YEAR
    },
    trimester: {
        type: String,
        required: [true, emptyFieldMessage('Trimester', 'subject')],
        enum: TRIMESTER_TYPE_VALUES
    }
});

module.exports = mongoose.model('Subject', subjectSchema);