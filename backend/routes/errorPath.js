const router = require('express').Router();
const userRoute = require('./users');
const cardsRoute = require('./cards');
const NotFoundError = require('../errors/NotFoundError');

router.use('/users', userRoute);
router.use('/cards', cardsRoute);

router.use((req, res, next) => {
  next(new NotFoundError({ message: 'Данный путь не найден' }));
});

module.exports = router;
