const fs = require('fs');
const fse = require('fs-extra');

const makeDir = (path) => {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if (err && err.code !== 'ENOENT') {
        reject(`Error getting stats for ${path}: ${err}`);
      } else if (stats && stats.isDirectory()) {
        fse.emptyDir(path, (err) => {
          if (err) {
            reject(`Error emptying directory ${path}: ${err}`);
          } else {
            resolve(`Directory ${path} emptied successfully`);
          }
        });
      } else {
        fs.mkdir(path, { recursive: true }, (err) => {
          if (err) {
            reject(`Error creating directory ${path}: ${err}`);
          } else {
            resolve(`Directory ${path} created successfully`);
          }
        });
      }
    });
  });
}


exports.makeDir = makeDir