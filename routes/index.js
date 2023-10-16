const router = require('express').Router();
const usersRoute = require('./users');
const moviesRouter = require('./movies');
const signupRouter = require('./signup');
const signinRouter = require('./signin');
const auth = require('../middlewares/auth');
const NotFoundError = require('../utils/errors/NotFoundError');
const { PageError } = require('../utils/constants');

router.use('/signin', signinRouter);
router.use('/signup', signupRouter);

router.use(auth);
router.use('/users', usersRoute);
router.use('/movies', moviesRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError(PageError.NotFoundPageError));
});

module.exports = router;
