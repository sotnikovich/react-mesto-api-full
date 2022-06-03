const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const Forbidden = require('../errors/Forbidden');
const BadRequest = require('../errors/BadRequest');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const ownerId = req.user;
  const {
    name,
    link,
    createdAt,
    likes,
  } = req.body;

  return Card.create({
    name,
    link,
    createdAt,
    likes,
    owner: ownerId,
  })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы невалидные данные'));
      }
      next(err);
    });
};

module.exports.likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (card) {
      return res.status(200).send(card);
    }
    throw new NotFoundError('Карточка с указанным _id не найдена.');
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequest('Переданы некорректные данные для постановки лайка'));
    }
    return next(err);
  });

module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (card) {
      return res.status(200).send(card);
    }
    throw new NotFoundError('Карточка с указанным _id не найдена.');
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequest('Переданы некорректные данные для удаления лайка'));
    }
    next(err);
  });

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => next(new NotFoundError('Карточка с указанным _id не найдена')))
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        next(new Forbidden('Нельзя удалить чужую карточку'));
      }
      return Card.deleteOne(card)
        .then(() => res.status(200).send(card));
    })
    .catch(next);
};
