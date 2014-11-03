// Node server that takes messages
// from the Rock Paper Scissors game
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8888);

// app.use(express('http://stevedudek.github.io/RockPaperScissors/public'));
app.use(express.static(__dirname + '/public'));
/*
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});
*/

io.on('connection', function (socket) {
  socket.on('player', function (player) {
    console.log("Player chooses " + player);
  });
  socket.on('computer', function (computer) {
    console.log("Computer chooses " + computer);
  });
  socket.on('result', function (result) {
    console.log("Player " + result + "s");
  });
  socket.on('pscore', function (score) {
    console.log("Player has " + score + " points");
  });
  socket.on('cscore', function (score) {
    console.log("Computer has " + score + " points");
  });
	/*
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
*/
});

/*
// __dirname + '/public'  = ./public
// Will look for index.html in public directory
app.use(express.static(__dirname + '/public'));

app.listen(8888);
*/