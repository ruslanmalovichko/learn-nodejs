'use strict';
const fs = require('fs');
const http = require('http');

function getEntries() {
  const entries = [];
  let entriesRaw = fs.readFileSync('./entries.txt', 'utf8'); // Read file
  // console.log('Ruslan-1');
  // console.log(entriesRaw);
  // console.log('Ruslan-2');
  entriesRaw = entriesRaw.split('---'); // Split text
  // console.log('Ruslan-3');
  // console.log(entriesRaw);
  // console.log('Ruslan-4');
  entriesRaw.map((entryRaw) => { // entryRaw = part of text, divided '---'
    const entry = {};
    // console.log('Ruslan-5');
    // console.log(entryRaw);
    // console.log('Ruslan-6');
    const lines = entryRaw.split('\n'); // Split each line
    // console.log('Ruslan-7');
    // console.log(lines);
    // console.log('Ruslan-8');
    lines.map((line) => { // Each line
      // console.log('Ruslan-9');
      // console.log(line);
      // console.log('Ruslan-10');
      if (line.indexOf('title: ') === 0) {
        entry.title = line.replace('title: ', ''); // insert title
      } else if (line.indexOf('date: ') === 0) {
        entry.date = line.replace('date: ', ''); // insert date
      } else {
        // console.log('Ruslan-11');
        // console.log(entry.body);
        // console.log('Ruslan-12');
        entry.body = entry.body || '';
        // console.log('Ruslan-13');
        // console.log(entry.body);
        // console.log('Ruslan-14');
        entry.body += line; // insert body
        // console.log('Ruslan-15');
        // console.log(entry.body);
        // console.log('Ruslan-16');
      }
    });
    entries.push(entry); // add entries
  });
  return entries; // return entries to console.log
}

const entries = getEntries();
console.log(entries);

