var app    = require('./app');
var http   = require('http');
var port   = process.env.PORT || 5000;
var server = http.createServer(app);


server.listen(port);
console.log('Listening on  ' + port);

server.on('error', onError);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
}
