var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http, {
  path: '/talk/socket.io'
});

app.get('/talk', function(req, res){
  res.sendFile(__dirname + '/src/index.html');
});

io
// .of('/talk')
.on('connection', function(socket){
  console.log('a user connected')
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});
http.listen(3000, function(){
  console.log('listening on *:3000');
});
