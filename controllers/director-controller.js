var lsApi    = require('../lib/ls-api')
var Director = require('../models/director')
var nohm     = require('nohm').Nohm;

module.exports = {
  index: index,
  show: show,
  create: create,
  update: update
}

function index(req, res){
  Director.findAndLoad({}, function(err, directors){
    if (err) {
      sendError.apply(this, [500, err])
    } else {
      var response = directors.map(function(dir){
        return dir.allProperties()
      })
      res.json(response)
    }
  })
}

function show(req, res){
  Director.findAndLoad({livestream_id: req.params.id}, function(err, items){
    if (err === 'not found') {
      sendError.apply(res, [400, err])
    } else if (err) {
      sendError.apply(res, [500, err])
    } else {
      res.json(items[0].allProperties())
    }
  })
}

function create(req, res){
  var lsId = req.body.livestream_id
  lsApi.get(lsId, function(err, body){
    if (err) {
      sendError.apply(res, [500, err])
    } else {
      var data = {
        full_name: body.full_name,
        dob: body.dob,
        livestream_id: lsId
      }

      director = nohm.factory("Director")
      director.p(data)

      director.save(function(err){
        if (err === "invalid") {
          sendError.apply(res, [400, director.errors])
        } else if (err) {
          sendError.apply(res, [500, err])
        } else {
          res.json(director.allProperties())
        }
      })
    }
  })
}

function update (req, res){
  Director.findAndLoad({livestream_id: req.params.id}, function(err, items){
    if (err) {
      sendError.apply(res, [500, err])
    } else {
      var director = items[0]
      var attributes = allowedParams(req.body)
      director.p(attributes)

      director.save(function(err){
        if (err === "invalid") {
          sendError.apply(res, [400, director.errors])
        } else if (err) {
          sendError.apply(res, [500, err])
        } else {
          res.json(director.allProperties())
        }
      })
    }
  })
}


function sendError(status, msg) {
  this.status(status)
  this.json({error: msg})
}

function allowedParams(attributes) {
  return {
    favorite_camera: attributes.favorite_camera,
    favorite_movies: attributes.favorite_movies
  }
}
