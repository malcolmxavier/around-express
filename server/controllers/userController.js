const User = require('../models/user');

const SUCCESS_CODE = 200;
const INVALID_ERROR_CODE = 400;
const NOT_FOUND_ERROR_CODE = 404;
const DEFAULT_ERROR_CODE = 500;

function getUsers(req, res) {
  return User.find({})
    .then((users) => res.status(SUCCESS_CODE).send(users))
    .catch((err) => res.status(INVALID_ERROR_CODE).send(err));
}

function getOneUser(req, res) {
  return User.find({ id: req.params.id })
    .then((user) => {
      if (user) {
        return res.status(SUCCESS_CODE).send(user);
      }

      return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'User ID not found.' });
    })
    .catch((err) => res.status(INVALID_ERROR_CODE).send(err));
}

function createUser(req, res) {
  return User.countDocuments({})
    .then((id) => User.create(...req.body, id))
    .then((user) => res.status(SUCCESS_CODE).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(INVALID_ERROR_CODE).send({ message: 'User validation failed' });
      } else {
        res.status(DEFAULT_ERROR_CODE).send({ message: 'Internal server error' });
      }
    });
}

function updateUser(req, res) {
  return User.findByIdAndUpdate(req.params._id, { name: req.body.name, about: req.body.about }
    .then((user) => res.status(SUCCESS_CODE).send(user))
    .catch(res.status(DEFAULT_ERROR_CODE).send({ message: 'Internal server error' })));
}

function updateUserAvatar(req, res) {
  return User.findByIdAndUpdate(req.params._id, { avatar: req.body.avatar }
    .then((user) => res.status(SUCCESS_CODE).send(user))
    .catch(res.status(DEFAULT_ERROR_CODE).send({ message: 'Internal server error' })));
}

module.exports = {
  getUsers,
  getOneUser,
  createUser,
  updateUser,
  updateUserAvatar,
};
