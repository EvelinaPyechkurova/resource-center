const User = require('../models/userModel');

const getUsers = async (filters = {}) => {
    try {
        return await User.find(filters);
    } catch (error) {
        console.error(`Error retrieving users with filters ${JSON.stringify(filters)}: ${ error }`);
    }
}

const getUserById = async (id) => {
    try {
        return await User.findById(id);
    } catch (error) {
        console.error(`Error retrieving user by ID ${id}: ${ error }`);
        throw error;
    }
}

const createUser = async (userData) => {
    try {
        return await User.create(userData);
    } catch (error) {
        console.error(`Error creating user: ${ error }`);
        throw error;
    }
}

const updateUser = async (id, userData) => {
    try {
        return await User.findByIdAndUpdate(id, userData, { new: true });
    } catch (error) {
        console.error(`Error updating user with ID ${id}:`, error);
        throw error;
    }
}

const deleteUser = async (id) => {
    try{
        return await User.findByIdAndDelete(id);
    }catch (error){
        console.error(`Error deleting user with ID ${id}:`, error);
        throw error;
    }
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};