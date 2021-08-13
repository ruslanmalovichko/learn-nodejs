'use strict';
const redis = require('redis');
const db = redis.createClient();

class Entry {
  constructor(obj) { // { username: null, title: 'Post 4 title', body: 'Post 4 body' }
    for (let key in obj) {
      this[key] = obj[key]; // Entry { username: null, title: 'Post 5 title', body: 'Post 4 body' }
    }
  }

  static getRange(from, to, cb) { // from = 0, to = -1, cp = [Function]
    db.lrange('entries', from, to, (err, items) => { // items, part of array "{"username":null,"title":"Post 4 title","body":"Post 4 body"}"
      if (err) return cb(err);
      let entries = [];
      items.forEach((item) => {
        entries.push(JSON.parse(item));
      });
      cb(null, entries); // Call callback and send entries. entries, part of array: {username: null, title: "Post 4 title", body: "Post 4 body"}
    });
  }

  save(cb) { // this store Entry object with data, inserted by user: body: "Post 6 body", title: "Post 6 title", username: null
    const entryJSON = JSON.stringify(this); // from object, to JSON format: "{"username":null,"title":"Post 6 title","body":"Post 6 body"}"
    db.lpush(
      'entries',
      entryJSON,
      (err) => {
        if (err) return cb(err);
        cb(); // Save data to entities table and call callback
      }
    );
  }

  static count(cb) { // currently doesn't call
    db.llen('entries', cb);
  }
}

module.exports = Entry;

