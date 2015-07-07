var express = require('express')
var app = express()
var cookieParser = require('cookie-parser')
var bodyParser   = require('body-parser')
var routes = require('./routes/directors.js')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())


app.use('/', routes)

module.exports = app
