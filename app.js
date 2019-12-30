const express = require('express');
const morgan = require('morgan');

// UTILS
const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controllers/errorController');

// ROUTES
const customerRoutes = require('./routes/customerRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// INITIALIZE EXPRESS MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.get('/', (req, res) => res.send('Hello'));

// INITIALIZE ROUTES
app.use('/api/v1/customers', customerRoutes);
app.use('/api/v1/user', userRoutes);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
