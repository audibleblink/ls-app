var md5 = require('MD5');
var e   = require('../lib/error-handler');

module.exports = {
  put: putDirectors
};

function putDirectors(req, res, next){

  if (req.method !== 'PUT')
    return next();

  var authHeader = req.headers.authorization;
  if (invalidHeader(authHeader))
    return e.throwUnauthorized(res);

  next();
}


function invalidHeader(header) {
  return !header || badHeader(header);
}


function badHeader(header) {
  var header = header.split(" ");
  return invalidMd5(header) || invalidLength(header) || invalidFormat(header);
}

function invalidMd5(number) {
  return !/[a-f0-9]{32}/.test(number);
}

function invalidLength(header) {
  return header.length !== 2;
}

function invalidFormat(header) {
  return header[0].toLowerCase() !== 'bearer';
}
