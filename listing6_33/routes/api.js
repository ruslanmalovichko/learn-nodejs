'use strict';
const auth = require('basic-auth');
const User = require('../models/user');
const Entry = require('../models/entry');

exports.auth = (req, res, next) => {
  const { name, pass } = auth(req);
  User.authenticate(name, pass, (err, user) => {
    if (user) req.remoteUser = user; // Save user to req.remoteUser
    next(err);
  });
};

exports.user = (req, res, next) => {
  User.get(req.params.id, (err, user) => { // id: "1"
    if (err) return next(err);
    if (!user.id) return res.send(404);
    res.json(user); // If we use curl cli querry, res.json will send result to the cli.
    // In models/user.js, toJSON we cut data, send id and name only
  });
};

exports.entries = (req, res, next) => {
  const page = req.page;
  Entry.getRange(page.from, page.to, (err, entries) => { // Get entries
    if (err) return next(err);
    res.format({
      'application/json': () => {
        res.send(entries); // return entries as json data
      },
      'application/xml': () => {
        res.render('entries/xml', { entries: entries }); // return entries as xml data
      }
    });
  });
};

