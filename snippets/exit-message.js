process.stdin.pipe(process.stdout);
process.on('exit', () => {
  const args = process.argv.slice(2);
  console.error(args.join(' '));
  console.log('Ruslan 1');
  console.log(args.join(' '));
  console.log('Ruslan 2');
});

// parse-json -f test.json >tmp.out && node exit-message.js "parsed JSON successfully" <tmp.out

