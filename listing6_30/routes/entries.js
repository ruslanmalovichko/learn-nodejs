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
  const user = res.locals.user; // Currently empty
  const username = user ? user.name : null; // Currently empty
  const entry = new Entry({
    username: username,
    title: data.title,
    body: data.body
  }); // Entry object: body: "Post 8 body", title: "Post 8 title", username: null
  entry.save((err) => {
    if (err) return next(err);
    res.redirect('/'); // Save Entry class and redirect to the homepage
  });
};

