const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

// تنظیمات سرور
const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // مطمئن شوید دامنه مناسب را تنظیم کرده‌اید
    methods: ["GET", "POST"]
  }
});

// نگهداری کاربران در یک اتاق
const users = {};

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // کاربر به یک اتاق ملحق می‌شود
  socket.on('join-room', (roomId, userId) => {
    if (!users[roomId]) users[roomId] = [];
    users[roomId].push(userId);
    socket.join(roomId);

    console.log(`User ${userId} joined room ${roomId}`);
    socket.to(roomId).emit('user-connected', userId);

    // دریافت و ارسال پیشنهاد WebRTC
    socket.on('offer', (offer, targetId) => {
      socket.to(targetId).emit('receive-offer', offer, socket.id);
    });

    // دریافت و ارسال پاسخ WebRTC
    socket.on('answer', (answer, targetId) => {
      socket.to(targetId).emit('receive-answer', answer);
    });

    // دریافت و ارسال ICE candidates
    socket.on('ice-candidate', (candidate, targetId) => {
      socket.to(targetId).emit('receive-ice-candidate', candidate);
    });

    // خروج کاربر از اتاق
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
      socket.to(roomId).emit('user-disconnected', userId);
      users[roomId] = users[roomId].filter((id) => id !== userId);
    });
  });
});

// شروع سرور
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});









// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const cors = require('cors');

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server, {
//   cors: {
//     origin: '*',
//     methods: ['GET', 'POST'],
//   },
// });

// let rooms = {}; // اتاق‌ها را ذخیره می‌کنیم

// io.on('connection', (socket) => {
//   console.log('New client connected');
  
//   socket.on('create-meeting', (data) => {
//     socket.join(data.meetingId);
//     rooms[data.meetingId] = { users: [socket.id] }; // اضافه کردن کاربر به اتاق
//     console.log('Meeting created with ID:', data.meetingId);
//   });

//   socket.on('join-meeting', (data) => {
//     if (rooms[data.meetingId]) {
//       rooms[data.meetingId].users.push(socket.id); // اضافه کردن کاربر به اتاق
//     } else {
//       rooms[data.meetingId] = { users: [socket.id] }; // ایجاد اتاق جدید
//     }
//     socket.join(data.meetingId);
//     console.log(`User joined meeting with ID: ${data.meetingId}`);
    
//     // ارسال سیگنال‌ها برای اتصال دیگر کاربران
//     if (rooms[data.meetingId].users.length > 1) {
//       socket.to(data.meetingId).emit('new-user', { userId: socket.id });
//     }
//   });

//   socket.on('disconnect', () => {
//     console.log('Client disconnected');
//     for (let room in rooms) {
//       const index = rooms[room].users.indexOf(socket.id);
//       if (index !== -1) {
//         rooms[room].users.splice(index, 1); // حذف کاربر از اتاق
//         socket.to(room).emit('user-left', { userId: socket.id });
//       }
//     }
//   });
// });

// server.listen(3000, () => {
//   console.log('Socket.IO server running on port 3000');
// });






