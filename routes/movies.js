const router = require('express').Router();
const { validateaddMovie, validatedeleteMovie } = require('../utils/validation');
const {
  getSavedMovies,
  addMovie,
  deleteMovie,
} = require('../controllers/movie');

router.get('/', getSavedMovies);

router.post('/', validateaddMovie, addMovie);

router.delete('/:movieId', validatedeleteMovie, deleteMovie);

module.exports = router;
