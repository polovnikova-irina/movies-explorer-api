const router = require('express').Router();
const usersRoute = require('./users');
const moviesRouter = require('./movies');
const signupRouter = require('./signup');
const signinRouter = require('./signin');
const auth = require('../middlewares/auth');
const NotFoundError = require('../utils/errors/NotFoundError');
const { PageErrorMessage } = require('../utils/constants');

router.use('/signin', signinRouter);
router.use('/signup', signupRouter);

router.use(auth);
router.use('/users', usersRoute);
router.use('/movies', moviesRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError(PageErrorMessage.NotFoundPageError));
});

module.exports = router;
