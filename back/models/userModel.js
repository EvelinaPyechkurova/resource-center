const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { 
    USER_ROLE_VALUES,
    DEFAULT_USER_ROLE
} = require('../utils/constants');
const { emptyFieldMessage } = require('../utils/validators/basicValidators');
const {
    validPhoneNumber,
    invalidPhoneNumberMessage,
    validEmail,
    invalidEmailMessage,
    validPassword,
    invalidPasswordMessage
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
        unique: true,
        validate: {
            validator: validEmail,
            message: invalidEmailMessage
        },
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: validPassword,
            message: invalidPasswordMessage
        }
    }
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return;
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    
    next();
});

userSchema.methods.comparePassword = async function(candidate) {
    return await bcrypt.compare(candidate, this.password);
};

module.exports = mongoose.model('User', userSchema);