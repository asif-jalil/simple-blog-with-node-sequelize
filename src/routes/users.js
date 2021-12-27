const express = require('express');
const router = express.Router();
const userController = require('../users/users.controller');

/* GET users listing. */
router.get('/:id', userController.findUserById);
router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;
