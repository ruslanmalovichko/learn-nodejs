const express = require('express');
const app = express();
const articles = [{ title: 'Example' }];
const bodyParser = require('body-parser');

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/articles', (req, res, next) => {
  res.send(articles); // Show all articles
});

app.post('/articles', (req, res, next) => {
  // res.send('OK');
  const article = { title: req.body.title };
  articles.push(article); // Save new article and show it
  res.send(article);
});

app.get('/articles/:id', (req, res, next) => {
  const id = req.params.id;
  console.log('Fetching:', id);
  res.send(articles[id]); // Show article by id
});

app.delete('/articles/:id', (req, res, next) => {
  const id = req.params.id;
  console.log('Deleting:', id);
  delete articles[id]; // Delete article by id
  res.send({ message: 'Deleted' });
});

app.listen(app.get('port'), () => {
  console.log('App started on port', app.get('port'));
});

module.exports = app;

