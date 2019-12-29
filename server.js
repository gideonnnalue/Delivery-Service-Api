const dotenv = require('dotenv');
// const mongoose = require('mongoose');
const app = require('./app');
const database = require('./DB');

dotenv.config({ path: './config.env' });

// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD
// );

// mongoose
//   .connect(process.env.DATABSE_LOCAL, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true
//   })
//   .then(() => console.log('Database connection succesful...'));

const PORT = process.env.PORT || 5000;

database.connect().then(() => {
  console.log('Database connection succesful...');

  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}...`);
  });
});
