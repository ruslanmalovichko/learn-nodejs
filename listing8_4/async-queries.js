const { Pool } = require('pg')
const pool = new Pool({
  user: 'sysadmin',
  host: '127.0.0.1',
  database: 'articles',
  password: '123',
  port: '5432',
})

let id = 0;
let body = 'hello world5';
let updatedBody = 'greetings, world';

;(async () => {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')

    const res = await client.query(`INSERT INTO snippets (body) VALUES ('${body}') RETURNING id`, (err, result) => {
      if (err) throw err;
      id = result.rows[0].id;
      console.log('Inserted row with id %s', id);
    });

    await client.query('COMMIT')

    await client.query(`UPDATE snippets SET body = 'greetings, world' WHERE id=${id}`, (err, result) => {
      if (err) throw err;
      console.log('Changed row with id %s', id);
    });

    await client.query('COMMIT')
  } catch (e) {
    await client.query('ROLLBACK')
    throw e
  } finally {
    client.release()
  }
})().catch(e => console.error(e.stack))

