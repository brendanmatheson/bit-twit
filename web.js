var app = require('express')()
  , server = require('http').createServer(app)
  , twitter = require('ntwitter')
  , io = require('socket.io').listen(server);

var port = process.env.PORT || 3000;
server.listen(port);


app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});


io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});


io.sockets.on('connection',function(socket){

var twit = new twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
  
});


twit.stream('statuses/filter', {'track':['education']}, function(stream) {

  stream.on('data', function (data) {
      socket.emit('tweet', {
      text: data.text,
      });
      socket.broadcast.emit('tweet', {
      text: data.text });
      socket.volatile.emit('tweet', {
      text: data.text });
  });
});
});




