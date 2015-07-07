var express = require('express')
var router = require('express').Router()

router.get("/directors", function(req, res){
  res.json({message: "hi there"})
})

module.exports = router
