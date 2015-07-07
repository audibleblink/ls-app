var router  = require('express').Router()
var lsApi   = require('../ls-api')
var Director = require('../models/director')
var nohm  = require('nohm').Nohm;


router
  .get("/directors", function(req, res){
    Director.find(function(err, ids){
      res.json({message: ids})
    })
  })

  .get("/directors/:id", function(req, res){

  })

  .post("/directors", function(req, res){
    var lsId = req.body.livestream_id
    lsApi.get(lsId, function(body){
      var data = {
        full_name: body.full_name,
        dob: body.dob,
        livestream_id: lsId
      }

      director = nohm.factory("Director")
      director.p(data)

      director.save(function(err){
        if (err === "invalid") {
          res.status(400)
          res.json({message: "invalid properties", data: director.errors})
        } else if (err) {
          console.log(err)
        } else {
          res.json(director.allProperties())
        }
      })

    })
  })

  .put("/directors/:id", function(req, res){

  })

  .delete("/directors/:id", function(req, res){

  })

module.exports = router
