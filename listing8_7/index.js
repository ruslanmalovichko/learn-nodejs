const db = require('./db');

db().then(() => {
  console.log('db ready');

  db.Article.create({
    title: 'my article2',
    content: 'article content2'
  }).then(() => {
    db.Article.all().then(articles => {
      console.log(articles);

      process.exit();
    });
  });
})
.catch(err => { throw err });
