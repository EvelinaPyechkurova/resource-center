const userDAO = require('../dao/userDAO');
const {
    validateCreateUser,
    validateUpdateUser
} = require('../utils/validators/userValidators');
const { 
    existEnrollmentsForThisStudent,
    existSubjectsForThisTeacher
} = require('../utils/constraints');


const buildUserFilters = async (query) => {
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

    if (query.subject && Types.ObjectId.isValid(query.subject)) {
        const studentIds =
            await enrollmentService.getStudentIdsBySubject(query.subject);

        filters._id = { $in: studentIds };
    }

    return filters;
};


const getUsers = async (query = {}) => {
    const filters = await buildUserFilters(query);
    return await userDAO.getUsers(filters);
};


const getUserById = async (id) => {
    return await userDAO.getUserById(id);
};


const createUser = async (userData) => {
    await validateCreateUser(userData);
    return await userDAO.createUser(userData);
};


const updateUser = async (id, userData) => {
    const existingUser = await userDAO.getUserById(id);

    if (!existingUser)
        throw new Error('Invalid data: cannot update non-existing user');

    validateUpdateUser(userData);
    console.log('validation passed')

    Object.assign(existingUser, userData);
    await existingUser.save();
    return existingUser;
};


const deleteUser = async (id) => {
    const user = await userDAO.getUserById(id);

    if (!user)
        throw new Error('User not found');

    if (user.role === 'student') {
        const hasEnrollments = await existEnrollmentsForThisStudent(id);
        if (hasEnrollments)
            throw new Error('Cannot delete student enrolled to subjects');
    }

    if (user.role === 'teacher') {
        const hasSubjects = await existSubjectsForThisTeacher(id);
        if (hasSubjects)
            throw new Error('Cannot delete teacher teaching subjects');
    }

    await userDAO.deleteUser(id);

    return { message: 'User deleted successfully' };
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};