function setup(format) {
  console.log(format); // Slava, why once?
  const regexp = /:(\w+)/g;
  return function createLogger(req, res, next) {
    const str = format.replace(regexp, (match, property) => {
      console.log('property start');
      console.log(property); // 4
      console.log('property end');
      return req[property];
    });
    console.log('str start');
    console.log(str); // Slava, why twice?
    console.log('str end');
    next();
  }
}
module.exports = setup;

