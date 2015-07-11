var livestream = require('stream-api-wrapper');
var Director   = require('../models/director');
var nohm       = require('nohm').Nohm;
var e          = require('../lib/error-handler');


module.exports = {
  index: index,
  show: show,
  create: create,
  update: update
};

// GET /dircetors
function index(req, res){
  Director.findAndLoad({}, function(err, directors){
    if (err)
      return e.handle.call(res, err);

    var response = directors.map(function(dir){
      return dir.allProperties();
    });
    res.json(response);
  });
}

// GET /directors/:id
function show(req, res){
  Director.findAndLoad({livestream_id: req.params.id}, function(err, items){
    if (err)
      return e.handle.call(res, err);

    res.json(items[0].allProperties());
  });
}

// POST /directors
function create(req, res){
  var lsId = req.body.livestream_id;
  livestream.account(lsId, function(err, body){
    if (err)
      return e.handle.call(res, err);

    var data = {
      full_name: body.full_name,
      dob: body.dob,
      livestream_id: lsId
    };

    var director = nohm.factory("Director");
    director.p(data);
    director.save(function(err){
      if (err)
        return e.handle.apply(res, [err, director.errors]);

      res.json(director.allProperties());
    });
  });
}

// PUT /directors
function update(req, res, next) {
  Director.findAndLoad({livestream_id: req.params.id}, function(err, items){
    if (err)
      return e.handle.call(res, err);

    var director = items[0];
    var token = req.headers.authorization.split(" ")[1];

    if(!director.validToken(token))
      return e.throwUnauthorized(res);

    var attributes = permittedParams(req.body);
    director.p(attributes);
    director.save(function(err){
      if (err === "invalid")
        return e.handle.apply(res, [err, director.errors]);

      res.json(director.allProperties());
    });
  });
}

// Sanitizes incoming parameters
function permittedParams(attributes) {
  return {
    favorite_camera: attributes.favorite_camera,
    favorite_movies: attributes.favorite_movies
  };
}
