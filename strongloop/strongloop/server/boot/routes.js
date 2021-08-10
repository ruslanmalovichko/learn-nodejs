module.exports = (app) => {
  const router = app.loopback.Router();
  router.get('/hello', (req, res) => {
    res.send('Hello, world');
  });
  app.use(router);
};

