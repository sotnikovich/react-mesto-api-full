const express = require('express');

const router = express.Router();
const { idValidation, userAvatarValid, userValid } = require('../middlewares/validation');

const {
  getUsers, findUser, getMe, updateUser, updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getMe);
router.get('/:userId', idValidation('userId'), findUser);
router.patch('/me', userValid, updateUser);
router.patch('/me/avatar', userAvatarValid, updateAvatar);

module.exports = router;
