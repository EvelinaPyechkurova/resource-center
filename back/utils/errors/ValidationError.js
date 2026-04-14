class ValidationError extends Error {

    constructor(message, errors=null) {
        super(message);
        this.name = 'ValidationError';
        this.errors = errors;
        Error.captureStackTrace(this, this.constructor);
    }

    toJSON() {
        return {
            name: this.name,
            message: this.message,
            errors: this.errors
        };
    }
}

module.exports = ValidationError;