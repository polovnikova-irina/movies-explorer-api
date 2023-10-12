const router = require('express').Router();
const { validatesingin } = require('../utils/constants');
const { login } = require('../controllers/users');

router.post('/', validatesingin, login);

module.exports = router;
