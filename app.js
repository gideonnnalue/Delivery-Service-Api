const express = require('express');
const morgan = require('morgan');

const app = express();

// INITIALIZE EXPRESS MIDDLEWARES

app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => res.send('Hello'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}...`);
});
