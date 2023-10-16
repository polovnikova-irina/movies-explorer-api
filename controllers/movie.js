const mongoose = require('mongoose');
const Movie = require('../models/movie');
const BadRequestError = require('../utils/errors/BadRequestError');
const NotFoundError = require('../utils/errors/NotFoundError');
const ForbiddenError = require('../utils/errors/ForbiddenError');
const { MovieErrorMessage } = require('../utils/constants');
const { MovieResponseMessage } = require('../utils/constants');
const { StatusCode } = require('../utils/constants');

module.exports.getSavedMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.status(StatusCode.OK).send(movies))
    .catch(next);
};

module.exports.addMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(MovieErrorMessage.IncorrectMovieId);
      }
      res.status(StatusCode.Created).send(movie);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(MovieErrorMessage.BadRequest));
      } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError(MovieErrorMessage.IncorrectMovieId));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(MovieErrorMessage.IncorrectMovieId);
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError(MovieErrorMessage.ForbiddenMovie);
      }
      return Movie.findByIdAndRemove(movieId);
    })
    .then(() => {
      res.status(StatusCode.OK).send({ message: MovieResponseMessage.MovieDeleted });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError(MovieErrorMessage.IncorrectMovieId));
      } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError(MovieErrorMessage.NotFoundMovie));
      } else {
        next(err);
      }
    });
};
