const userDAO = require('../dao/userDAO');
const {
    validateCreateUser,
    validateUpdateUser
} = require('../utils/validators/userValidators');
const { existSubjectsForThisStudent } = require('../utils/constraints');


const buildUserFilters = (query) => {
    const filters = {};

    if (query.search) {
        const search = query.search;

        filters.$or = [
            { name: { $regex: search, $options: 'i' } },
            { surname: { $regex: search, $options: 'i' } },
            { phone: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } }
        ];
    } else {
        if (query.role)
            filters.role = new RegExp(`^${query.role}$`, 'i');

        if (query.name)
            filters.name = new RegExp(query.name, 'i');

        if (query.surname)
            filters.surname = new RegExp(query.surname, 'i');

        if (query.phone)
            filters.phone = new RegExp(query.phone, 'i');

        if (query.email)
            filters.email = new RegExp(query.email, 'i');
    }

    return filters;
};


const getUsers = async (query = {}) => {
    const filters = buildUserFilters(query);
    return await userDAO.getUsers(filters);
};


const getUserById = async (id) => {
    return await userDAO.getUserById(id);
};


const createUser = async (userData) => {
    validateCreateUser(userData);
    return await userDAO.createUser(userData);
};


const updateUser = async (id, userData) => {
    const existingUser = await userDAO.getUserById(id);

    if (!existingUser)
        throw new Error('Invalid data: cannot update non-existing user');

    validateUpdateUser(userData);
    return await userDAO.updateUser(id, userData);
};


const deleteUser = async (id) => {
    const hasSubjects = await existSubjectsForThisStudent(id);
    if (hasSubjects) 
        throw new Error('Cannot delete user with associated subjects.');

    const result = await userDAO.deleteUser(id);
    if (!result) 
        throw new Error('User not found');

    return {message: 'User deleted successfully'};    
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};