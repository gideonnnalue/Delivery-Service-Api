const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// SECURITY IMPORTS
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

// UTILS
const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controllers/errorController');

// ROUTES
const customerRoutes = require('./routes/customerRoutes');
const userRoutes = require('./routes/userRoutes');
const shipmentRoutes = require('./routes/shipmentRoutes');

const app = express();

// INITIALIZE EXPRESS MIDDLEWARES
// Implement cors
app.use(cors());

// Access-Control-Allow-Origin *
app.options('*', cors());

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parser reading data from req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Data sanitization against NoSQL query attacks
app.use(mongoSanitize());

// Data sanitizaton against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: ['country', 'state', 'city', 'createdAt']
  })
);

app.get('/', (req, res) => res.send('Hello'));

// INITIALIZE ROUTES
app.use('/api/v1/customers', customerRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/shipment', shipmentRoutes);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
