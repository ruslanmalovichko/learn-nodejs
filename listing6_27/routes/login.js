const User = require('../models/user');

exports.submit = (req, res, next) => {
  const data = req.body.user; // {name: "ruslanmalovichko", pass: "1"}
  User.authenticate(data.name, data.pass, (err, user) => {
    // user: User object: id: "1", name: "ruslanmalovichko", pass: "$2b$12$uiH3lxXixd2Ca4tsDhXPxOKk2enbEN.HYDpPt1AwTGfTgHO68L6dS", salt: "$2b$12$uiH3lxXixd2Ca4tsDhXPxO"
    if (err) return next(err);
    if (user) {
      req.session.uid = user.id; // Add user id to session
      res.redirect('/');
    } else {
      res.error('Sorry! invalid credentials. ');
      res.redirect('back');
    }
  });
};

exports.form = (req, res) => {
  res.render('login', { title: 'Login' }); // Render form from views/login.ejs
};

exports.logout = (req, res) => {
  req.session.destroy((err) => { // Destroy session on logout
    if (err) throw err;
    res.redirect('/');
  })
};

