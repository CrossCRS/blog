/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const routes = require('./routes/routes');

const PORT = process.env.PORT || 9000;
const MONGODB_URI = process.env.DB_URL;

const MONGOOSE_OPTS = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const app = express();

if (app.get('env') === 'test') { // Tests setup
  const { MongoMemoryServer } = require('mongodb-memory-server');
  const bcrypt = require('bcrypt');
  const User = require('./models/user.model');
  const mongoServer = new MongoMemoryServer();

  mongoServer.getUri().then((mongoUri) => {
    mongoose.connect(mongoUri, MONGOOSE_OPTS)
      .then(() => {
        // Create an admin account for testing
        User.create({
          username: 'admin',
          display_name: 'Administrator',
          email: 'admin@blog.dev',
          is_admin: true,
          password: bcrypt.hashSync('P@ssw0rd', parseInt(process.env.BCRYPT_SALT_ROUNDS, 10)),
        }, (err) => {
          if (err) { console.log('Couldn\'t create a testing admin account!'); process.exit(1); }
        });

        // Start on random port for parallel testing
        const TEST_PORT = Math.floor(Math.random() * (9999 - 6000 + 1)) + 6000;

        // Extend onto the app object so we can close the server after all tests are done
        app.server = app.listen(TEST_PORT, process.env.IP);
      })
      .catch((err) => { console.log(err); process.exit(1); });
  });
} else { // Dev/Prod setup
  mongoose.connect(MONGODB_URI, MONGOOSE_OPTS)
    .then(() => {
      console.log('Connected to MongoDB');
      app.listen(PORT, process.env.IP, () => {
        console.log(`App listening on port ${PORT}`);
      });
    })
    .catch((err) => { console.log(err); process.exit(1); });
}

if (app.get('env') !== 'test') { // Don't log requests in tests
  app.use(morgan(app.get('env') === 'development' ? 'dev' : 'common')); // Request logging
}
app.use(cors());
app.use(express.json()); // Body parser middleware
app.use(express.urlencoded({ extended: false }));

// app.use(express.static('public'));

// Setup routes
routes(app);

// catch 404 and forward to error handler
app.use((req, res, next) => next(createError(404, 'Route not found')));

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (req.app.get('env') === 'development') {
    res.status(err.status || 500).send({ error: true, message: err.message });
  } else {
    res.status(err.status || 500).send({ error: true, message: err.expose ? err.message : undefined });
  }
});

module.exports = app; // For tests
