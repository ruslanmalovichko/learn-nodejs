const pg = require('pg');
const db = new pg.Client({
  user: 'sysadmin',
  host: '127.0.0.1',
  database: 'articles',
  password: '123',
  port: '5432',
});

db.connect((err, client) => {
  if (err) throw err;
  console.log('Connected to database', db.database);

  db.query(`
    SELECT * FROM snippets ORDER BY id
  `, (err, result) => {
    if (err) throw err;
    console.log(result.rows);
    db.end();
  });
});

