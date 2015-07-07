var express      = require('express')
var cookieParser = require('cookie-parser')
var bodyParser   = require('body-parser')
var routes       = require('./routes/directors.js')
var app          = express()

var Director = require('./models/director')
var nohm  = require('nohm').Nohm;
var redis = require('redis').createClient();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())

nohm.setClient(redis)
app.use(nohm.connect([{
  model: Director
}]))

app.use('/', routes)

module.exports = app
