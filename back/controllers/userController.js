const userService = require('../services/userService');
const mongoose = require('mongoose');

const getUsers = async (req, res) => {
    try {
        const users = await userService.getUsers(req.query);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).json({ error: `${id} is invalid ID address` });
        const user = await userService.getUserById(id);

        if (user)
            res.status(200).json(user);
        else
            res.status(404).json({ error: `user with ID ${id} not found` });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createUser = async (req, res) => {
    try {
        const user = req.body;
        await userService.createUser(user);
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(400).json({ error });
    }
};

const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const existingUser = await userService.getUserById(id);

        if (!existingUser)
            return res.status(404).json({ error: `user with ID ${id} not found` });

        const user = req.body;
        await userService.updateUser(id, user);
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(400).json({ error });
    }
};

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const existingUser = await userService.getUserById(id);
        if (!existingUser)
            return res.status(404).json({ error: `user with ID ${id} not found` });

        await userService.deleteUser(id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};