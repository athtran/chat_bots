var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user has connected');
  socket.on('chat_message', function (message) {
    io.emit('chat_message', message);
  });
  socket.on('disconnect', function () {
    console.log('a user has disconnected');
  });
});

server.listen(port, function(){
  console.log('listening on *:' + port);
});
