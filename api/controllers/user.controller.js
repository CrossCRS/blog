const createError = require('http-errors');
const User = require('../models/user.model');

exports.get_user_by_username = (req, res, next) => {
  const { username } = req.params;

  User.findOne({ username })
    .select('username display_name')
    .then((user) => {
      if (user == null) {
        next(createError(404, 'User not found'));
      }
      res.send(user);
    })
    .catch(next);
};
