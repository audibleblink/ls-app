var Director = require('../models/director')
var md5      = require('MD5')

function putDirectors(req, res, next){
  if (req.method === 'PUT') {

    if (!req.headers.authorization)
      return sendError.apply(res, [401, "Unauthorized"])

    var token = req.headers.authorization.split(" ")[1]
    var directorId = req.body.livestream_id

    Director.findAndLoad({livestream_id: directorId}, function(err, items){
      if (err)
        return sendError.apply(res, [401, "Unauthorized"])

      var director = items[0]
      if (validToken(token, director)) {
        next()
      } else {
        sendError.apply(res, [401, "Unauthorized"])
      }
    })

  } else {
    next()
  }
}

function validToken(token, instance) {
  return token === md5(instance.allProperties().full_name)
};

function sendError(status, msg) {
  this.status(status)
  this.json({error: msg})
}

module.exports = {
  put: putDirectors
}
