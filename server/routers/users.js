const express = require('express');

const router = express.Router();
const {
  getUsers, getOneUser, createUser, updateUser, updateUserAvatar,
} = require('../controllers/userController');

router.get('/users', getUsers);

router.get('/users/:id', getOneUser);

router.post('/users', createUser);

router.patch('/users/me', updateUser);

router.patch('/users/me/avatar', updateUserAvatar);

module.exports = router;
