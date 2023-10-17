const UserErrorMessage = {
  BadRequest: 'Введены некорректные данные',
  Unauthorized: 'Неправильные почта или пароль',
  ConflictError: 'Пользователь с таким email уже существует',
  NotFoundError: 'Пользователь по указанному _id не найден',
};

const MovieResponseMessage = {
  MovieDeleted: 'Фильм удален',
};

const MovieErrorMessage = {
  NotFoundMovie: 'Фильм по указанному _id не найден',
  ForbiddenMovie: 'Фильм другого пользователя удалить нельзя',
  IncorrectMovieId: 'Указан некорректный _id фильма',
  BadRequest: 'Введены некорректные данные',
};

const PageError = {
  NotFoundPageError: 'Страница не найдена',
};

const StatusCode = {
  OK: 200,
  Created: 201,
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  Conflict: 409,
  NotFound: 404,
};

module.exports = {
  UserErrorMessage,
  MovieResponseMessage,
  MovieErrorMessage,
  StatusCode,
  PageError,
};
