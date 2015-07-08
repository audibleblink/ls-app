var Director = require('../models/director')
var md5      = require('MD5')
var e        = require('../lib/error-handler')

module.exports = {
  put: putDirectors
}

function putDirectors(req, res, next){
  if (req.method === 'PUT') {

    if (!req.headers.authorization)
      return e.throwUnauthorized(res)

    var token = req.headers.authorization.split(" ")[1]
    var directorId = req.body.livestream_id

    Director.findAndLoad({livestream_id: directorId}, function(err, items){
      if (err)
        return e.handle(res, err)

      var director = items[0]
      if (validToken(token, director)) {
        next()
      } else {
        e.throwUnauthorized(res)
      }
    })

  } else {
    next()
  }
}

function validToken(token, instance) {
  return token === md5(instance.allProperties().full_name)
};
