const router = require('express').Router();
const { validatesingup } = require('../utils/constants');
const { createUser } = require('../controllers/users');

router.post('/', validatesingup, createUser);

module.exports = router;
