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
  const jwt = require('jsonwebtoken');
  const User = require('./models/user.model');
  const mongoServer = new MongoMemoryServer();

  mongoServer.getUri().then((mongoUri) => {
    mongoose.connect(mongoUri, MONGOOSE_OPTS)
      .then((db) => {
        app.tests = {};
        // Create an admin account for testing
        app.tests.user_admin_password = 'P@ssw0rd';
        app.tests.user_admin = {
          username: 'admin',
          display_name: 'Administrator',
          email: 'admin@blog.dev',
          is_admin: true,
          password: bcrypt.hashSync(app.tests.user_admin_password, parseInt(process.env.BCRYPT_SALT_ROUNDS, 10)),
        };
        const user = new User(app.tests.user_admin);
        user.save();

        // Create a temporary token for testing
        app.tests.jwt_admin = jwt.sign({
          display_name: app.tests.user_admin.display_name,
          username: app.tests.user_admin.username,
          email: app.tests.user_admin.email,
          is_admin: app.tests.user_admin.is_admin,
        }, process.env.JWT_SECRET, { expiresIn: '5m' });

        // Start on random port for parallel testing
        const TEST_PORT = Math.floor(Math.random() * (9999 - 6000 + 1)) + 6000;

        // Extend onto the app object so we can close the server after all tests are done
        app.dbServer = mongoServer;
        app.db = db;
        app.server = app.listen(TEST_PORT, process.env.IP, () => app.emit('app_ready'));
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
