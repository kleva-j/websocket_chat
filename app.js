const express = require('express');
const socket = require('socket.io');
const port = process.env.PORT || 3000;
const app = express();

app.use(express.static('Public'));

app.get('*', (req, res) => {
  console.log(req.method + ".." + req.url);
  res.status(404)
  .send('Welcome to WebSockets_Api, this route does not exist');
});

const server = app.listen(port, () => {
  console.log(`server running on port ${port}`)
});

//create socket connection
const io = socket(server);

//listen for socket connections
io.sockets.on('connection', (socket) => {
  // listen for chat events
  socket.on('chat message', (data) => {
    socket.broadcast.emit('chat message', data);
  })
});
