const env = process.env.NODE_ENV || 'development';

function errorHandler(err, req, res, next) {
  res.statusCode = 500;
  switch (env) {
    case 'development':
      console.error('Error:');
      console.error(err);
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.strigify(err));
      break;
    default:
      res.end('Server error');
  }
}

module.exports = errorHandler;
// Currently I dont know how to call this code

