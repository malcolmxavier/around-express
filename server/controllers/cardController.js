const StatusCodes = require('http-status-codes');

const Card = require('../models/card');

function getCards(req, res) {
  return Card.find({})
    .then((users) => res.status(StatusCodes.OK).send(users))
    .catch((err) => res.status(StatusCodes.BAD_REQUEST).send(err));
}

function createCard(req, res) {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(StatusCodes).OK.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(StatusCodes.BAD_REQUEST).send({ message: 'Card validation failed' });
      } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'Internal server error' });
      }
    });
}

function deleteCard(req, res) {
  const { id } = req.params.cardId;
  return Card.deleteOne(id)
    .then((card) => res.status(StatusCodes.OK).send({ card, message: 'Card has been deleted' }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(StatusCodes.NOT_FOUND).send({ message: 'The requested card was not found' });
      } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'Internal server error' });
      }
    });
}

function addCardLike(req, res) {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((user) => res.status(StatusCodes.OK).send(user))
    .catch(res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'Internal server error' }));
}

function removeCardLike(req, res) {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((user) => res.status(StatusCodes.OK).send(user))
    .catch(res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'Internal server error' }));
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addCardLike,
  removeCardLike,
};
