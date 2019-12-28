const AppError = require('../utils/AppError');

/**
 * Function used to handle Database ID cast errors
 * @function
 * @param {object} err - error object
 * @return  {Object} error object
 */
const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

/**
 * Function used to handle Database duplicate fields
 * @function
 * @param {object} err - error object
 * @return  {Object} error object
 */
const handleDuplicateFieldsDB = err => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value`;
  return new AppError(message, 400);
};

/**
 * Function used to handle Database validation errors
 * @function
 * @param {object} err - error object
 * @return  {Object} error object
 */
const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(el => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

/**
 * Function used to handle JWT Token errors
 * @function
 * @return  {Object} error object
 */
const handleJWTError = () =>
  new AppError('Invalid token. Please log in again', 401);

/**
 * Function used to handle JWT Token expiration
 * @function
 * @return  {Object} error object
 */
const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please log in again.', 401);

/**
 * Function used to handle error in development environment
 * @function
 * @param {object} err - error object
 * @param {object} res - response object
 * @return  {Object} result
 */
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

/**
 * Function used to handle error in production environment
 * @function
 * @param {object} err - error object
 * @param {object} res - response object
 * @return  {Object} result
 */
const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });

    // Programming or other unknown error: don't leak error details
  }
  // 1) Log error
  else {
    console.log('ERROR 🔥', err);

    // 2) Send generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong'
    });
  }
};

/**
 * Function used to handle global errors
 * @function
 * @param {object} err - error object
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {object} next - response object
 * @return  {Object} result
 */
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();
    sendErrorProd(error, res);
  }
};
