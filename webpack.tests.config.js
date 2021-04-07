const webPack = require('./webpack.config');
const fs = require('fs');
const path = require('path');

const readDirRecursiveSync = (folder, filter) => {
  const currentPath = fs.readdirSync(folder).map(f => path.join(folder, f));
  const files = currentPath.filter(filter);

  const directories = currentPath
    .filter(f => fs.statSync(f).isDirectory())
    .map(f => readDirRecursiveSync(f, filter))
    .reduce((cur, next) => [...cur, ...next], []);
  return [...files, ...directories];
}

const getEntries = folder => readDirRecursiveSync(folder, f => f.match(/.*(tests|specs)\.ts?$/))
  .map((file) => {
    return {
      name: path.basename(file, path.extname(file)),
      path: path.resolve(file)
    }
  })
  .reduce((memo, file) => {
    memo[file.name] = file.path;
    return memo;
  }, {});

module.exports = Object.assign({}, webPack, { entry: getEntries('./tests/host/') });