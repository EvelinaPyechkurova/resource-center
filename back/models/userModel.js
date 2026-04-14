const mongoose = require('mongoose');
const { 
    USER_ROLE_VALUES,
    DEFAULT_USER_ROLE
} = require('../utils/constants');
const { emptyFieldMessage } = require('../utils/validators/basicValidators');
const {
    validPhoneNumber,
    invalidPhoneNumberMessage,
    validEmail,
    invalidEmailMessage
} = require('../utils/validators/userValidators');


const userSchema = new mongoose.Schema({
    role: {
        type: String,
        required: [true, emptyFieldMessage('Role', 'user')],
        enum: USER_ROLE_VALUES,
        default: DEFAULT_USER_ROLE,
    },
    name: {
        type: String,
        required: [true, emptyFieldMessage('Name', 'user')],
        lowercase: true,
    },
    surname: {
        type: String,
        required: [true, emptyFieldMessage('Surname', 'user')],
        lowercase: true,
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: validPhoneNumber,
            message: invalidPhoneNumberMessage
        },
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: validEmail,
            message: invalidEmailMessage
        },
        lowercase: true,
    }
});

module.exports = mongoose.model('User', userSchema);