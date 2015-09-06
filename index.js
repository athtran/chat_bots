var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;
var users = 0;
var fs = require('fs');
var words = [];
var blacklist = {};

fs.readFile('dictionary.txt', function(err, data) {
    if(err) throw err;
    words = data.toString().split("\n");
});

fs.readFile('blacklist.txt', function(err, data) {
    if(err) throw err;
    var arr = data.toString().split("\n");
    for (var i = 0; i < arr.length; i++) {
      blacklist[arr[i]] = true;
    }
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  io.emit('chat_message', 'User #' + (++users) + ' has joined the server');
  var id = setInterval(function() {
    broadcast_msg(words[Math.floor(Math.random()*words.length)]);
  }, 5);

  console.log('a user has connected');
  socket.on('chat_message', function (message) {
    broadcast_msg(message);
  });
  socket.on('disconnect', function () {
    console.log('a user has disconnected');
  });
});

server.listen(port, function(){
  console.log('listening on *:' + port);
});

function broadcast_msg(message) {
  if (blacklist[message]) {
    io.emit('chat_message', "***************FORBIDDEN WORD***************");
    console.log('FORBIDDEN WORD CAUGHT: ', message);
  } else {
    var username = "User " + users;
    message = username + ": " + message;
    io.emit('chat_message', message);
  }
}
