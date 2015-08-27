var e = require('../lib/error-handler');
var tokenValidator = require('./token-validator');

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
  return !header || tokenValidator(header);
}
