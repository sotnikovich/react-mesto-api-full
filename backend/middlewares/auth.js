const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return next(new Unauthorized('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};
