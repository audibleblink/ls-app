var Director = require('../models/director');
var md5      = require('MD5');
var e        = require('../lib/error-handler');

module.exports = {
  put: putDirectors
};

function putDirectors(req, res, next){
  if (req.method === 'PUT') return next();

  if (!req.headers.authorization)
    return e.throwUnauthorized(res);

  var token = req.headers.authorization.split(" ")[1];
  var directorId = req.body.livestream_id || req.params.id;

  Director.findAndLoad({livestream_id: directorId}, function(err, items){
    if (err)
      return e.handle.call(res, err);

    var directorName = items[0].allProperties().full_name;
    if (validToken(token, directorName)) {
      next();
    } else {
      e.throwUnauthorized(res);
    }
  });
}


function validToken(token, full_name) {
  return token === md5(full_name);
}
