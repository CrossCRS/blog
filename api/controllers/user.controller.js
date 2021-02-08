const User = require('../models/user.model');

exports.get_user_by_username = (req, res, next) => {
  const { username } = req.params;

  User.findOne({ username })
    .select('username display_name')
    .then((user) => { res.send(user); })
    .catch(next);
};
