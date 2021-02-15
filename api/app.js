require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const routes = require('./routes/routes');

const PORT = process.env.PORT || 9000;
const MONGODB_URI = process.env.DB_URL;

const app = express();

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, process.env.IP, () => {
      console.log(`App listening on port ${PORT}`);
    });
  })
  .catch((err) => { console.log(err); process.exit(1); });

app.use(morgan(app.get('env') === 'development' ? 'dev' : 'common')); // Request logging
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
