const mongoose = require('mongoose');

const connect = () => {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === 'test') {
      mongoose
        .connect(process.env.DATABSE_TEST, {
          useNewUrlParser: true,
          useCreateIndex: true,
          useFindAndModify: false,
          useUnifiedTopology: true
        })
        .then((res, err) => {
          if (err) return reject(err);
          resolve();
        });
    } else {
      mongoose
        .connect(process.env.DATABSE_LOCAL, {
          useNewUrlParser: true,
          useCreateIndex: true,
          useFindAndModify: false,
          useUnifiedTopology: true
        })
        .then((res, err) => {
          if (err) return reject(err);
          resolve();
        });
    }
  });
};

const close = () => {
  return mongoose.disconnect();
};

module.exports = { connect, close };
