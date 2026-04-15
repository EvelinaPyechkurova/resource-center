const { USER_ROLE_VALUES } = require('../constants');
const {
    notEmptyString,
    requiredLetterField,
    invalidObjectMessage
} = require('./basicValidators');
const ValidationError = require('../errors/ValidationError');


// Helper validators used for User model fields
const validRole = (role) => {
    return notEmptyString(role) && USER_ROLE_VALUES.includes(role);
}

const validPhoneNumber = (number) => {
    const phoneNumberPattern = /^\+?[1-9]\d{0,2}[-.\s]?(\(?\d{2,4}\)?)[-.\s]?\d{3,4}[-.\s]?\d{3,4}$/;
    return notEmptyString(number) && phoneNumberPattern.test(number);
}

const validEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return notEmptyString(email) && emailPattern.test(email);
}


// Error messages User model fields
const invalidUserRoleMessage = `user role must be present and be one of: ${USER_ROLE_VALUES.join(', ')}`;
const invalidPhoneNumberMessage = 'field is not valid phone number';
const invalidEmailMessage = 'field is not valid email';


// Actual validators for creating and updating User model
function validateCreateUser(user) {
    const errors = {};

    if (!user || typeof user !== 'object' || Object.keys(user).length !== 5)
        errors.general = invalidObjectMessage('user')


    const { role, name, surname, phone, email } = user;

    if (!validRole(role))
        errors.role = invalidUserRoleMessage;
    const nameError = requiredLetterField(name, 'Name');
    if (nameError)
        errors.name = nameError;
    const surnameError = requiredLetterField(surname, 'Surname');
    if (surnameError)
        errors.name = surnameError;
    if (!validPhoneNumber(phone))
        errors.phone = `Phone ${invalidPhoneNumberMessage}`;
    if (!validEmail(email)) 
        errors.email = `Email ${invalidEmailMessage}`;

    if (Object.keys(errors).length > 0)
        throw new ValidationError(`Validation failed for creating user`, errors);
}

function validateUpdateUser(user) {
    const allowedFields = ['role', 'name', 'surname', 'phone', 'email'];
    const errors = {};

    const fields = Object.keys(user);
    const invalidFields = fields.filter(field => !allowedFields.includes(field));

    if (invalidFields.length > 0)
        errors.invalidFields = `Invalid fields in the update: ${invalidFields.join(", ")}`;

    if ('name' in user) {
        const error = requiredLetterField(user.name, 'Name');
        if (error) errors.name = error;
    }
    if ('surname' in user) {
        const error = requiredLetterField(user.surname, 'Surname');
        if (error) errors.surname = error;
    }
    if ('phone' in user && !validPhoneNumber(user.phone))
        errors.phone = `Phone ${invalidPhoneNumberMessage}`;

    if ('email' in user && !validEmail(user.email))
        errors.email = `Email ${invalidEmailMessage}`;

    if (Object.keys(errors).length > 0)
        throw new ValidationError(`Validation failed for updating user`, errors);
}


module.exports = {
    validRole,
    invalidUserRoleMessage,
    validPhoneNumber,
    invalidPhoneNumberMessage,
    validEmail,
    invalidEmailMessage,
    validateCreateUser,
    validateUpdateUser
};