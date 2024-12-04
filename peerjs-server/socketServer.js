const http = require('http');
const socketIo = require('socket.io');

function startSocketServer(app) {
  const server = http.createServer(app);
  const io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('join-room', ({ userId }) => {
      console.log(`${userId} joined the room.`);
      socket.broadcast.emit('user-connected', { id: userId });
    });

    socket.on('send-message', (message) => {
      io.emit('receive-message', message);
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
      socket.broadcast.emit('user-disconnected', socket.id);
    });
  });

  return server;
}

module.exports = startSocketServer;
