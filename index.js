var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user has connected');
  socket.on('chat_message', function (message) {
    console.log('message: ' + message);
  });
  socket.on('disconnect', function () {
    console.log('a user has disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});