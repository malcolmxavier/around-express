const fs = require('fs').promises;

function getFileContent(path, req, res) {
  return fs.readFile(path, { encoding: 'utf-8' })
    .then(JSON.parse)
    .catch(res.status(404).send({ message: 'Requested Resource not found' }));
}

module.exports = getFileContent;
