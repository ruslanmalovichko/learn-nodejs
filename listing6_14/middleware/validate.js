'use strict';

function parseField(field) {
  return field
    .split(/\[|\]/)
    .filter((s) => s);
}

function getField(req, field) { // field: (2) ["entry", "title"]
  let val = req.body;
  field.forEach((prop) => { // val: entry: {title: "123", body: "456"}
    val = val[prop];
    // First, prop=entry, val: {title: "123", body: "456"}
    // Second, prop=title, val: 123
  });
  return val;
}

exports.required = (field) => {
  field = parseField(field); // field: "entry[title]" -> field: ["entry", "title"]
  return (req, res, next) => {
    if (getField(req, field)) {
      next();
    }
    else {
      // res.error(`${field.join(' ')} is required`);
      throw new Error(`${field.join(' ')} is required`); // entry title is required
      res.redirect('back');
    }
  };
};

exports.lengthAbove = (field, len) => {
  field = parseField(field); // field: "entry[title]" -> field: ["entry", "title"]
  return (req, res, next) => {
    if (getField(req, field).length > len) {
      next();
    } else {
      const fields = field.join(' ');
      // res.error(`${fields} must have more than ${len} characters`);
      throw new Error(`${fields} must have more than ${len} characters`); // entry title must have more than 4 characters
      res.redirect('back');
    }
  };
};

