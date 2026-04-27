const authController = require('../controllers/authController');
const userController = require('../controllers/userController')
const express = require('express');

const router = express.Router();

router.post('/register', userController.createUser);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

module.exports = router;