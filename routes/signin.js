const router = require('express').Router();
const { validatesingin } = require('../utils/validation');
const { login } = require('../controllers/users');

router.post('/', validatesingin, login);

module.exports = router;
