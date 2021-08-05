const express = require('express');
const app = express();
const Article = require('./db').Article;
const bodyParser = require('body-parser');
const read = require('node-readability');
const url = 'https://www.manning.com/books/node-js-in-action-second-edition';

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  '/css/bootstrap.css',
  express.static('node_modules/bootstrap/dist/css/bootstrap.css')
);

app.get('/articles', (req, res, next) => {
  // res.send(articles); // Show all articles
  Article.all((err, articles) => {
    if (err) return next(err);
    // res.send(articles);
    // console.log(Object.getOwnPropertyNames(articles[0].id));

    res.format({
      html: () => {
        res.render('articles.ejs', { articles: articles }); // Render result with articles template
      },
      json: () => {
        res.send(articles);
      }
    });
  })
});

app.post('/articles', (req, res, next) => {
  const url = req.body.url;
//   // res.send('OK');
//   const article = { title: req.body.title };
//   articles.push(article); // Save new article and show it
//   res.send(article);

  read(url, (err, result) => { // Read web page
    if (err || !result) res.status(500).send('Error downloading article');
    Article.create(
      { title: result.title, content: result.content },
      (err, article) => {
        if (err) return next(err);
        res.send('OK');
      }
    ); // Create article
  });
});

app.get('/articles/:id', (req, res, next) => {
  const id = req.params.id;
  // console.log('Fetching:', id);
  // res.send(articles[id]); // Show article by id
  Article.find(id, (err, article) => {
    // console.log(article);
    if (err) return next(err);
    res.send(article); // Get article
  })
});

app.delete('/articles/:id', (req, res, next) => {
  const id = req.params.id;
  // console.log('Deleting:', id);
  // delete articles[id]; // Delete article by id
  // res.send({ message: 'Deleted' });
  Article.delete(id, (err) => {
    if (err) return next(err);
    res.send({ message: 'Deleted' });
  }) // Delete article
});

app.listen(app.get('port'), () => {
  console.log('App started on port', app.get('port'));
});

module.exports = app;

