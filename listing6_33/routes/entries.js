const Entry = require('../models/entry');

exports.list = (req, res, next) => {
  const page = req.page;
  Entry.getRange(0, -1, (err, entries) => { // entries, part of array: {username: null, title: "Post 7 title", body: "Post 7 body"}
    if (err) return next(err);
    res.render('entries', { // Render data entries
      title: 'Entries',
      entries: entries
    });
  });
};

exports.form = (req, res) => {
  res.render('post', { title: 'Post' }); // Render form from /views/post.ejs
};

exports.submit = (req, res, next) => {
  const data = req.body.entry; // Data from form when user submits: {title: "Post 8 title", body: "Post 8 body"}

  let user;
  if (user) { // If current user is empty and user from api not empty, use him
    user = res.locals.user; // Get current user
  }
  else if (req.remoteUser) { // If current user is empty and user from api not empty, use him
    user = req.remoteUser;
  }
  else return next(); // If no user, not save post

  const username = user ? user.name : null; // Currently empty
  const entry = new Entry({
    username: username,
    title: data.title,
    body: data.body
  }); // Entry object: body: "Post 8 body", title: "Post 8 title", username: ruslanmalovichko
  entry.save((err) => {
    if (err) return next(err);
    if (req.remoteUser) {
      res.json({ message: 'Entry added.' });
    }
    else {
      res.redirect('/');
    }
  });
};

