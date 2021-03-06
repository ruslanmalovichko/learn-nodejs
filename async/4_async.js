const async = require('async');
const exec = require('child_process').exec;
function downloadNodeVersion(version, destination, callback) {
  const url = `https://nodejs.org/dist/v${version}/node-v${version}.tar.gz`;
  const filepath = `${destination}/${version}.tgz`;
  exec(`curl ${url} > ${filepath}`, callback); // Download files
}
async.series([
  callback => {
    async.parallel([
      callback => {
        console.log('Downloading Node v4.4.7...')
        downloadNodeVersion('4.4.7', './tmp', callback); // Call downloadNodeVersion in parallel
      },
      callback => {
        console.log('Downloading Node v6.3.0...')
        downloadNodeVersion('6.3.0', './tmp', callback); // Call downloadNodeVersion in parallel
      }
    ], callback);
  },
  callback => {
    console.log('Creating archive of downloading files...');
    exec(
      'tar cvf node_distors.tar ./tmp/4.4.7.tgz ./tmp/6.3.0.tgz', // When downloading files finishes, archive files
      err => {
        if (err) throw err;
        console.log('All done!');
        callback();
      }
    );
  },
], (err, results) => {
  if (err) throw err;
});

