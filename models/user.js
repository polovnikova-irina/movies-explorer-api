const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
      minlength: [2, 'минимальная длина поля - 2'],
      maxlength: [30, 'максимальная длина поля - 30'],
    },
    email: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
      unique: [true, 'Поле должно быть уникальным'],
      validate: {
        validator: (v) => isEmail(v),
        message: 'Введите верный email',
      },
    },
    password: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
      minlength: 5,
      select: false,
    },
  },
  { versionKey: false },
);

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Неправильные почта или пароль');
          }

          return user;
        });
    });
};

const user = mongoose.model('user', userSchema);

module.exports = user;
