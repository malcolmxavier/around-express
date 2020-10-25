const Card = require('../models/card');

const SUCCESS_CODE = 200;
const INVALID_ERROR_CODE = 400;
const NOT_FOUND_ERROR_CODE = 404;
const DEFAULT_ERROR_CODE = 500;

function getCards(req, res) {
  return Card.find({})
    .then((users) => res.status(SUCCESS_CODE).send(users))
    .catch((err) => res.status(INVALID_ERROR_CODE).send(err));
}

function createCard(req, res) {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(SUCCESS_CODE).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(INVALID_ERROR_CODE).send({ message: 'Card validation failed' });
      } else {
        res.status(DEFAULT_ERROR_CODE).send({ message: 'Internal server error' });
      }
    });
}

function deleteCard(req, res) {
  const { id } = req.params.cardId;
  return Card.deleteOne(id)
    .then((card) => res.status(SUCCESS_CODE).send({ card, message: 'Card has been deleted' }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(NOT_FOUND_ERROR_CODE).send({ message: 'The requested card was not found' });
      } else {
        res.status(DEFAULT_ERROR_CODE).send({ message: 'Internal server error' });
      }
    });
}

function addCardLike(req, res) {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((user) => res.status(SUCCESS_CODE).send(user))
    .catch(res.status(DEFAULT_ERROR_CODE).send({ message: 'Internal server error' }));
}

function removeCardLike(req, res) {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((user) => res.status(SUCCESS_CODE).send(user))
    .catch(res.status(DEFAULT_ERROR_CODE).send({ message: 'Internal server error' }));
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addCardLike,
  removeCardLike,
};
