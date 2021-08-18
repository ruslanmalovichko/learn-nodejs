const User = require('../models/user');
module.exports = (req, res, next) => {
  const uid = req.session.uid; // Get uid from session
  if (!uid) return next();
  User.get(uid, (err, user) => {
    if (err) return next(err);
    req.user = res.locals.user = user; // If user exist, save user data at req.user and res.locals.user
    next();
  });
};
