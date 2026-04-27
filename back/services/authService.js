// services/authService.js
const userDAO = require('../dao/userDAO');

const register = async (userData) => {
    return await userService.createUser(userData);
};

const login = async ({ email, password }) => {
    const user = await userDAO.getUserByEmail(email);
    invalidCredsError = new Error('Invalid credentials');

    if (!user)
        throw invalidCredsError;

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
        throw invalidCredsError;

    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    return {
        token,
        user: {
            id: user._id,
            email: user.email,
            role: user.role
        }
    };
};

module.exports = {
    register,
    login
};