var app        = require('express')()
var routes     = require('./routes/director-routes.js')
var bodyParser = require('body-parser')

var authCtrl = require('./controllers/auth-controller.js')
var Director = require('./models/director')
var nohm     = require('nohm').Nohm;
var redis    = require('redis').createClient();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Introduce middleware to protect our PUT route
app.use(authCtrl.put)
app.use('/', routes)

redis.on("connect", function() {
  nohm.setClient(redis)
  console.log("Nohm Connected to Redis Client")
  app.use(nohm.connect([{
    model: Director
  }]))
})

module.exports = app
