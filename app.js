const express = require('express');
const morgan = require('morgan');

// ROUTES
const customerRoutes = require('./routes/customerRoutes');

const app = express();

// INITIALIZE EXPRESS MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.get('/', (req, res) => res.send('Hello'));

// INITIALIZE ROUTES
app.use('/api/v1/customers', customerRoutes);

module.exports = app;
