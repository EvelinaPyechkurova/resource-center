// services/authService.js
const userDAO = require('../dao/userDAO');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (userData) => {
    const { email, password } = userData;

    if (!email || !password)
        throw new Error('Email and password are required');

    const existing = await userDAO.getUserByEmail(email);
    if (existing)
        throw new Error('Email already exists');

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userDAO.createUser({
        ...userData,
        password: hashedPassword
    });

    return user;
};

const login = async ({ email, password }) => {
    const user = await userDAO.getUserByEmail(email);

    if (!user)
        throw new Error('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
        throw new Error('Invalid credentials');

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