const mongoose = require('mongoose');
const { isURL } = require('validator');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
    },
    director: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
    },
    duration: {
      type: Number,
      required: [true, 'Поле должно быть заполнено'],
    },
    year: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
    },
    description: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
    },
    image: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
      validate: {
        validator: (v) => isURL(v),
        message: 'Поле должно содержать корректную ссылку',
      },
    },
    trailerLink: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
      validate: {
        validator: (v) => isURL(v),
        message: 'Поле должно содержать корректную ссылку',
      },
    },
    thumbnail: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
      validate: {
        validator: (v) => isURL(v),
        message: 'Поле должно содержать корректную ссылку',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'Поле должно быть заполнено'],
    },
    movieId: {
      type: Number,
      maxlength: [24, 'максимальная длина поля - 24'],
      required: true,
    },
    nameRU: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
    },
    nameEN: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
    },
  },
  { versionKey: false },
);

const movie = mongoose.model('movie', movieSchema);

module.exports = movie;
