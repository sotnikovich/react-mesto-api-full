const express = require('express');

const router = express.Router();
const { idValidation, userAvatarValid, userValid } = require('../middlewares/validation');

const {
  getUser, findUser, getUserMe, updateUser, updateAvatar,
} = require('../controllers/users');

router.get('/', getUser);
router.get('/me', getUserMe);
router.get('/:userId', idValidation('userId'), findUser);
router.patch('/me', userValid, updateUser);
router.patch('/me/avatar', userAvatarValid, updateAvatar);

module.exports = router;
