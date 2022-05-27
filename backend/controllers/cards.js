const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const Forbidden = require('../errors/Forbidden');
const BadRequest = require('../errors/BadRequest');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      if (cards) {
        res.status(200).send({ cards });
      }
      throw new NotFoundError('Нет пользователя с таким id');
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link, owner = req.user._id } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Некорректные данные при создании карточки'));
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((user) => {
      if (user) {
        res.status(200).send({ user });
      }
      throw new NotFoundError('Нет пользователя с таким id');
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((user) => {
      if (user) {
        res.status(200).send({ user });
      }
      throw new NotFoundError('Нет пользователя с таким id');
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Карточка не найдена'));
      }
      if (card.owner.toString() === req.user._id.toString()) {
        return card.remove()
          .then(() => res.status(200).send({ data: card, message: 'Карточка удалена' }));
      }
      return next(new Forbidden('Нельзя удалить чужую карточку'));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest({ message: 'Переданы некорректные данные' }));
      }
      next(err);
    });
};
