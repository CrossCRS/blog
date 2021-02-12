const createError = require('http-errors');
const jwt = require('jsonwebtoken');

exports.isAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    next(createError(403, 'Access denied'));
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      next(createError(403, 'Access denied'));
    }

    req.user = user;
  });
  next();
};

exports.isAdmin = (req, res, next) => {
  if (!req.user.is_admin) {
    next(createError(403, 'Access denied'));
  }
  next();
};