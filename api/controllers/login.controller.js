const createError = require('http-errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator/check');
const User = require('../models/user.model');

exports.login = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(createError(422, 'Invalid payload'));
  }

  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user == null) {
        next(createError(401, 'Email and/or password is incorrect.'));
      } else {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            next(err);
          }
          if (!result) {
            next(createError(401, 'Email and/or password is incorrect.'));
          }

          // Create JWT token
          jwt.sign({
            display_name: user.display_name,
            username: user.username,
            email: user.email,
            is_admin: user.is_admin,
          }, process.env.JWT_SECRET, { expiresIn: '6h' }, (jwtErr, token) => {
            if (jwtErr) {
              next(jwtErr);
            }
            res.send({ token });
          });
        });
      }
    })
    .catch(next);
};

exports.validate = (method) => {
  switch (method) {
    case 'login': {
      return [
        body('email', 'Invalid email').exists().isEmail(),
        body('password').exists().isString(),
      ];
    }
  }
  return [];
};
