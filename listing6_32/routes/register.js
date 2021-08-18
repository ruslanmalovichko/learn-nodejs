const User = require('../models/user');

exports.form = (req, res) => {
  res.render('register', { title: 'Register' }); // Render form from views/register.ejs
};

exports.submit = (req, res, next) => {
  var data = req.body.user; // {name: "ruslanmalovichko", pass: "1"}
  console.log('User:', req.body.user);
  User.getByName(data.name, (err, user) => { // Get user by name
    if (err) return next(err);

    if (user.id) {
      res.error('Username already taken!');
      res.redirect('back'); // If user exists, so error
    }
    else {
      user = new User({ name: data.name, pass: data.pass }); // Create user object
      user.save((err) => { // save user at database
        if (err) return next(err);
        req.session.uid = user.id; // save user id in to the req.session.uid
        res.redirect('/')
      });
    }
  });
};

