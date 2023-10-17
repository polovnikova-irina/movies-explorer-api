const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../utils/errors/BadRequestError');
const NotFoundError = require('../utils/errors/NotFoundError');
const ConflictError = require('../utils/errors/ConflictError');
const { UserErrorMessage } = require('../utils/constants');
const { StatusCode } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUser = (req, res, next) => {
  const userId = req.user._id;
  User.findOne({ _id: userId })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(UserErrorMessage.BadRequest);
      }
      res.status(StatusCode.OK).send({
        email: user.email,
        name: user.name,
      });
    })
    .catch(next);
};

module.exports.createUser = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hash, name });

    return res.status(StatusCode.Created).send({
      email: user.email, name: user.name, _id: user._id,
    });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return next(new BadRequestError(UserErrorMessage.BadRequest));
    } if (err.code === 11000) {
      return next(new ConflictError(UserErrorMessage.ConflictError));
    }
    return next(err);
  }
};

module.exports.editUserData = (req, res, next) => {
  const { name, email } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(
    userId,
    { name, email },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.status(StatusCode.OK).send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(UserErrorMessage.BadRequest));
      } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError(UserErrorMessage.NotFoundError));
      } else if (err.code === 11000) {
        next(new ConflictError(UserErrorMessage.ConflictError));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};
