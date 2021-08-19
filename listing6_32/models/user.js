'use strict';

const redis = require('redis');
const bcrypt = require('bcrypt');
const db = redis.createClient();

class User {
  constructor(obj) {
    for (let key in obj) {
      // obj: name: "ruslanmalovichko2", pass: "1"
      // this: User
      this[key] = obj[key]; // Apply methods name: "ruslanmalovichko2", pass: "1" to User object in this
      // obj: name: "ruslanmalovichko2", pass: "1"
      // this: User: name: "ruslanmalovichko2", pass: "1"
    }
  }

  save(cb) {
    if (this.id) {
      this.update(cb);
    } else {
      db.incr('user:ids', (err, id) => { // change increment of user:ids
        if (err) return cb(err);
        this.id = id;
        this.hashPassword((err) => {
          if (err) return cb(err);
          this.update(cb);
        });
      });
    }
  }

  update(cb) {
    const id = this.id;
    db.set(`user:id:${this.name}`, id, (err) => { // Write user:id:ruslanmalovichko
      if (err) return cb(err);
      db.hmset(`user:${id}`, this, (err) => { // Save user data at user:1
        cb(err);
      });
    });
  }

  hashPassword(cb) {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) return cb(err);
      this.salt = salt;
      bcrypt.hash(this.pass, salt, (err, hash) => {
        if (err) return cb(err);
        this.pass = hash; // Add method pass to user
        cb();
      });
    });
  }

  toJSON() { // we cut data, send id and name only
    return {
      id: this.id,
      name: this.name
    };
  }

  static getByName(name, cb) {
    User.getId(name, (err, id) => { // Find id of user by user name
      if (err) return cb(err);
      User.get(id, cb); // Send user id to get function
    });
  }

  static getId(name, cb) {
    db.get(`user:id:${name}`, cb);
  }

  static get(id, cb) {
    db.hgetall(`user:${id}`, (err, user) => {
      if (err) return cb(err);
      cb(null, new User(user)); // Get user data by user id, create new object User with whis data and return this object
    });
  }

  static authenticate(name, pass, cb) {
    User.getByName(name, (err, user) => {
      if (err) return cb(err);
      if (!user.id) return cb();
      bcrypt.hash(pass, user.salt, (err, hash) => {
        if (err) return cb(err);
        if (hash === user.pass) return cb(null, user); // Check user password and send user object if OK
        cb();
      });
    });
  }
}

module.exports = User;

