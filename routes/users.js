const router = require('express').Router();
const { validateUserData } = require('../utils/validation');
const {
  getUser,
  editUserData,
} = require('../controllers/users');

router.get('/me', getUser);

router.patch('/me', validateUserData, editUserData);

module.exports = router;
