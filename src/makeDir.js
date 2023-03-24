const fs = require('fs')

const makeDir = (path) => {
  return new Promise((resolve, reject) => {
    fs.mkdir(path, { recursive: true }, (err) => {
      if (err) {
        if (err.code === 'EEXIST') {
          resolve(`Directory ${path} already exists`);
        } else {
          reject(`Error creating directory ${path}: ${err}`);
        }
      } else {
        resolve(`Directory ${path} created successfully`);
      }
    });
  });
}

exports.makeDir = makeDir