const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const entries = require('./routes/entries');
const users = require('./routes/users');
const validate = require('./middleware/validate');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); // Use folder views for view code
app.set('view engine', 'ejs');
app.set('json spaces', 2); // beautify json

app.locals.user = {}; // add empty user object

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // encode form results
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', users); // send users to /users route

app.get('/', entries.list); // call routes/entries.js, exports.list
app.get('/post', entries.form); // call routes/entries.js, exports.form

app.post('/post',
  validate.required('entry[title]'), // call middleware/validate.js, exports.required, send entry[title]
  validate.lengthAbove('entry[title]', 4), // call middleware/validate.js, exports.lengthAbove, send entry[title] and 4

  entries.submit);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found'); // If the page does not exits
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res) => { // Currently can't debug'
    res.status(err.status || 500);
    console.log(1);
    debugger;
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => { // Currently can't debug'
  res.status(err.status || 500);
  console.log(2);
  debugger;
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;

