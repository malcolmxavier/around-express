const StatusCodes = require('http-status-codes');

const User = require('../models/user');

function getUsers(req, res) {
  return User.find({})
    .then((users) => res.status(StatusCodes.OK).send(users))
    .catch((err) => res.status(StatusCodes.BAD_REQUEST).send(err));
}

function getOneUser(req, res) {
  return User.findById({ _id: req.params._id })
    .then((user) => res.status(StatusCodes.OK).send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(StatusCodes.NOT_FOUND).send({ message: 'User ID not found.' });
      } else {
        res.status(StatusCodes.BAD_REQUEST).send(err);
      }
    });
}

function createUser(req, res) {
  const { name, about, avatar } = req.body;
  return User.countDocuments({})
    .then((_id) => User.create({
      name, about, avatar, _id,
    }))
    .then((user) => res.status(StatusCodes.OK).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(StatusCodes.BAD_REQUEST).send({ message: 'User validation failed' });
      } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'Internal server error' });
      }
    });
}

function updateUser(req, res) {
  return User.findByIdAndUpdate(req.params._id, { name: req.body.name, about: req.body.about }
    .then((user) => res.status(StatusCodes.OK).send(user))
    .catch(res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'Internal server error' })));
}

function updateUserAvatar(req, res) {
  return User.findByIdAndUpdate(req.params._id, { avatar: req.body.avatar }
    .then((user) => res.status(StatusCodes.OK).send(user))
    .catch(res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'Internal server error' })));
}

module.exports = {
  getUsers,
  getOneUser,
  createUser,
  updateUser,
  updateUserAvatar,
};
