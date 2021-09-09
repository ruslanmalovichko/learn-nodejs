#!/usr/bin/node
const concat = require('mississippi').concat;
const readFile = require('fs').readFile;
const yargs = require('yargs');
const argv = yargs
  .usage('parse-json [options]') // Info for documentation with help
  .help('h') // Add help arg
  .alias('h', 'help') // Add help alias
  .demand('f') // require -f to run
  .nargs('f', 1) // tell yargs -f needs 1 argument after it
  .describe('f', 'JSON file to parse') // f description for documentation
  .argv;

const file = argv.f;
// console.log('Ruslan 1');
// console.log(file);
// console.log('Ruslan 2');
// console.log(parse.toString());
// console.log('Ruslan 3');
// console.log(concat(parse));
// console.log('Ruslan 4');
// console.log(process.stdin.pipe(concat(parse)));
// console.log('Ruslan 5');
// console.log(process.stdin.pipe(concat));
// console.log('Ruslan 6');
// console.log(process.stdin.pipe.toString());
// console.log('Ruslan 7');

function parse(str) {
  // console.log('Ruslan 8');
  // console.log(JSON.parse(str));
  // console.log('Ruslan 9');
 
  const value = JSON.parse(str);
  console.log(JSON.stringify(value));
}

if (file === '-') {
  process.stdin.pipe(concat(parse)); // get json data not from file name, but from data stdin
} else {
  readFile(file, (err, dataBuffer) => {
    if (err) throw err;
    else parse(dataBuffer.toString());
  });
}

/*
 * To install: sudo npm install --global
 * Program will be created at: /usr/local/bin/parse-json
 * Run with filename: parse-json -f test.json
 * Run with data in stdin: echo "[1,2,3]" | parse-json -f -
 * Run with wrong filename: parse-json -f invalid.json
 * Run with wrong filename and write error to out.log: parse-json -f invalid.json 2> out.log
 * Run with data in stdin, write result json at out.json and write error to errors.log: echo "[1,2,3]" | parse-json -f - > out.json 2> errors.log
 */

