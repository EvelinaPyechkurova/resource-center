// Basic validators used for all models
const isString = (v) => typeof v === 'string';

const notEmptyString = (str) =>
  isString(str) && str.trim().length > 0;

const isLetterString = (str) =>
  isString(str) && /^[\p{L}]+$/u.test(str.trim());


// Basic error messages
const emptyStringMessage = 'field cannot be empty or consist of only whitespace';
const notLetterOnlyMessage = 'field can contain only letters (no spaces, numbers, or special characters)';
const emptyFieldMessage = (field, model) => `${field} is required for ${model}`;
const invalidObjectMessage = (model) => `${model} object is missing or contains an invalid number of fields`


// Composite validator for letter-only required field
const requiredLetterField = (value, fieldLabel) => {
    if (!notEmptyString(value))
        return `${fieldLabel} ${emptyStringMessage}`;

    if (!isLetterString(value))
        return `${fieldLabel} ${notLetterOnlyMessage}`;

    return null;
};


module.exports = {
    notEmptyString,
    emptyStringMessage,
    isLetterString,
    notLetterOnlyMessage,
    emptyFieldMessage,
    invalidObjectMessage,
    requiredLetterField
};