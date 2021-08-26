const pg = require('pg');

const db = new pg.Client({
  user: 'sysadmin',
  host: '127.0.0.1',
  database: 'articles',
  password: '123',
  port: '5432',
});

db.connect((err, client) => {
  db.query(`
    CREATE TABLE IF NOT EXISTS snippets (
      id SERIAL,
      PRIMARY KEY(id),
      body text
    );
  `  , (err, result) => {
    if (err) throw err;
    console.log('Created table "snippets"');
    db.end();
  });
});

