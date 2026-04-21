const mongoose = require('mongoose');
const { emptyFieldMessage } = require('../utils/validators/basicValidators');


const enrollmentSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, emptyFieldMessage('Enrollment', 'student')]
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, emptyFieldMessage('Enrollment', 'subject')]
    }
});

enrollmentSchema.index({ student: 1, subject: 1 }, { unique: true });

module.exports = mongoose.model('Enrollment', enrollmentSchema);