var livestream = require('stream-api-wrapper')
var Director   = require('../models/director')
var nohm       = require('nohm').Nohm
var md5        = require('MD5')
var e          = require('../lib/error-handler')


module.exports = {
  index: index,
  show: show,
  create: create,
  update: update
}

function index(req, res){
  Director.findAndLoad({}, function(err, directors){
    if (err) {
      e.handle(res, err)
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
    if (err) {
      e.handle(res, err)
    } else {
      res.json(items[0].allProperties())
    }
  })
}

function create(req, res){
  var lsId = req.body.livestream_id
  livestream.account(lsId, function(err, body){
    if (err) {
      e.handle(res, err)
    } else {
      var data = {
        full_name: body.full_name,
        dob: body.dob,
        livestream_id: lsId
      }

      director = nohm.factory("Director")
      director.p(data)

      director.save(function(err){
        if (err) {
          e.handle(res, err, director.errors)
        } else {
          res.json(director.allProperties())
        }
      })
    }
  })
}


function update(req, res, next) {
  Director.findAndLoad({livestream_id: req.params.id}, function(err, items){
    if (err) {
      e.handle(res, err)
    } else {
      var director = items[0]
      var attributes = allowedParams(req.body)

      director.p(attributes)

      director.save(function(err){
        if (err === "invalid") {
          e.handle(res, err, direcor.errors)
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
