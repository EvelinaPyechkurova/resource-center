const userController = require('../controllers/userController');
const express = require('express');

const router = express.Router();

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
// router.post('/', userController.createUser);
router.patch('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;