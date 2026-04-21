const Enrollment = require('../models/enrollementModel');

const getEnrollments = async (filters = {}) => {
    try {
        return await Enrollment.find(filters);
    } catch (error) {
        console.error(`Error retrieving enrollments with filters ${JSON.stringify(filters)}:`, error);
    }
};

const getEnrollmentById = async (id) => {
    try {
        return await Enrollment.findById(id);
    } catch (error) {
        console.error(`Error retrieving enrollment by ID ${id}:`, error);
        throw error;
    }
};

const createEnrollment = async (enrollmentData) => {
    try {
        return await Enrollment.create(enrollmentData);
    } catch (error) {
        console.error('Error creating enrollment:', error);
        throw error;
    }
};

const updateEnrollment = async (id, enrollmentData) => {
    try {
        return await Enrollment.findByIdAndUpdate(id, enrollmentData, {
            new: true,
            runValidators: true
        });
    } catch (error) {
        console.error(`Error updating enrollment with ID ${id}:`, error);
        throw error;
    }
};

const deleteEnrollment = async (id) => {
    try {
        return await Enrollment.findByIdAndDelete(id);
    } catch (error) {
        console.error(`Error deleting enrollment with ID ${id}:`, error);
        throw error;
    }
};

module.exports = {
    getEnrollments,
    getEnrollmentById,
    createEnrollment,
    updateEnrollment,
    deleteEnrollment
};