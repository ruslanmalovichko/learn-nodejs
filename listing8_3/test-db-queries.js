// const pg = require('pg');
// const db = new pg.Client({ database: 'articles' });
// 
// db.connect((err, client) => {
//   if (err) throw err;
//   console.log('Connected to database', db.database);
// 
//   const body = 'hello world';
//   db.query(`
//     INSERT INTO snippets (body) VALUES (
//       '${body}'
//     )
//     RETURNING id
//   `, (err, result) => {
//     if (err) throw err;
//     const id = result.rows[0].id;
//     console.log('Inserted row with id %s', id);
// 
//     db.query(`
//       INSERT INTO snippets (body) VALUES (
//         '${body}'
//       )
//       RETURNING id
//     `, (err, result) => {
//       if (err) throw err;
//       const id = result.rows[0].id;
//       console.log('Inserted row with id %s', id);
//       db.end();
//     });
//   });
// });

// const { Client } = require('pg')
// const client = new Client()
// await client.connect()
// const res = await client.query('SELECT $1::text as message', ['Hello world!'])
// console.log(res.rows[0].message) // Hello world!
// await client.end()

const pg = require('pg');
const pool = new pg.Pool({
user: 'sysadmin',
host: '127.0.0.1',
database: 'mywebstore',
password: '123',
port: '5432'});

// pool.query("SELECT NOW()", (err, res) => {
// console.log(err, res);
// pool.end();
// });

// pool.query("CREATE TABLE users(id SERIAL PRIMARY KEY, firstname VARCHAR(40) NOT NULL, lastName VARCHAR(40) NOT NULL)", (err, res) => {
// console.log(err, res);
// pool.end();
// });

// pool.query("INSERT INTO users(id, firstName, lastName) VALUES(1, 'Shahriar2', 'Shovon2')", (err, res) => {
// console.log(err, res);
// pool.end();
// });

// pool.query("SELECT * FROM users", (err, res) => {
// console.log(err, res);
// pool.end();
// });

// pool.query("UPDATE users SET firstName='Shovon3', lastName='Shahriar3' WHERE id=1", (err, res) => {
// console.log(err, res);
// pool.end();
// });

pool.query("DELETE FROM users WHERE id=1", (err, res) => {
console.log(err, res);
pool.end();
});

