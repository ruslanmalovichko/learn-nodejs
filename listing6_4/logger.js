function setup(format) {
  console.log(format); // Call once because call connect().use(setup(':method :url')) on initial app
  const regexp = /:(\w+)/g;
  return function createLogger(req, res, next) {
    const str = format.replace(regexp, (match, property) => {
      console.log('property start');
      console.log(property); // 4
      console.log('property end');
      return req[property];
    });
    console.log('str start');
    console.log(str); // Call twice because not call on initial. Call on two routes: GET / and GET /favicon.ico
    console.log('str end');
    next();
  }
}
module.exports = setup;

