'use strict';
const express = require('express');

function message(req) {
  return (msg, type) => {
    // Example if on register, user already exist. msg: "Username already taken!", type: "error", req.session.messages = Empty array
    type = type || 'info'; // If type is empty, type = 'info'
    let sess = req.session;
    sess.messages = sess.messages || [];
    sess.messages.push({ type: type, string: msg }); // Add message in to the session
  };
};

module.exports = (req, res, next) => {
  res.message = message(req); // Add message function in to the res.message
  res.error = (msg) => { // Add logic in to res.error
    return res.message(msg, 'error');
  };
  res.locals.messages = req.session.messages || []; // Add messages from session in to the res.locals.messages
  res.locals.removeMessages = () => { // Add logic in to the res.locals.removeMessages
    req.session.messages = [];
  };
  next();
};

