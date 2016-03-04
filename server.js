const  app = require("express")();
  var server = require('http').Server(app);
  var io = require('socket.io')(server);  

  var chart = ["GOOG", "AAPL", "MSFT"];
  //var currentDes = "hello";

  // normal routes =============================================================

    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

  // functions =================================================================
  
  function updatePoll() {
    var api_key = "U6-MhpspPQ5xXTRTNhEV";
    io.on('connection', function (socket) {
      socket.broadcast.emit('chart', chart);
      socket.emit('chart', chart);
      //socket.emit('description', currentDes);
      socket.emit('api_key', api_key);
      
      socket.on('recieved', function (data) {
        //console.log(data);
      });
      socket.on('change', function(data) {
        //console.log(data);
        chart = data;
        socket.broadcast.emit('chart', data);
        socket.emit('chart', data);
      });
      socket.on('newTerm', function(data) {
        //console.log("Got newTerm");
        socket.emit("newData", data);
        socket.broadcast.emit('newData', data);
        //console.log("Sent newData");
      });
    });
  }
  updatePoll();
  
server.listen(8080);
console.log("Server Started...");