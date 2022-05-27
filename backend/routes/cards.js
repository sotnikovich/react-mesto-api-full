const express = require('express');

const router = express.Router();

const { idValidation, cardValidation } = require('../middlewares/validation');

const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', cardValidation, createCard);
router.delete('/:cardId', idValidation('cardId'), deleteCard);
router.put('/:cardId/likes', idValidation('cardId'), likeCard);
router.delete('/:cardId/likes', idValidation('cardId'), dislikeCard);

module.exports = router;
