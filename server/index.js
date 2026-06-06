const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' ? '*' : ['http://localhost:3000'],
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/build')));

// في الذاكرة - الغرف والرسائل
const rooms = new Map();
const usernames = new Map();

// Helper function لإنشاء كود عشوائي
function generateRoomCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// Helper function لولادة اسم مستخدم عشوائي
function generateUsername() {
  const adjectives = ['سريع', 'ذكي', 'قوي', 'ودود', 'مرح', 'شجاع', 'هادئ', 'نشيط'];
  const nouns = ['نسر', 'أسد', 'نمر', 'ذئب', 'ثعلب', 'دب', 'فيل', 'غزال'];
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const num = Math.floor(Math.random() * 1000);
  return `${adj}${noun}${num}`;
}

// REST API Routes
app.post('/api/rooms/create', (req, res) => {
  const roomCode = generateRoomCode();
  rooms.set(roomCode, {
    code: roomCode,
    messages: [],
    users: new Set(),
    createdAt: new Date()
  });
  res.json({ success: true, roomCode });
});

app.get('/api/rooms/verify/:code', (req, res) => {
  const { code } = req.params;
  const roomExists = rooms.has(code);
  res.json({ exists: roomExists });
});

// Socket.io Events
io.on('connection', (socket) => {
  console.log('مستخدم جديد متصل:', socket.id);

  // ينضم المستخدم إلى الغرفة
  socket.on('join-room', (roomCode, callback) => {
    if (!rooms.has(roomCode)) {
      callback({ success: false, message: 'الغرفة غير موجودة' });
      return;
    }

    const username = generateUsername();
    usernames.set(socket.id, username);
    socket.join(roomCode);

    const room = rooms.get(roomCode);
    room.users.add(socket.id);

    // إرسال الرسائل السابقة
    socket.emit('load-messages', room.messages);

    // إخبار الجميع بانضمام مستخدم جديد
    io.to(roomCode).emit('user-joined', {
      username,
      userCount: room.users.size
    });

    callback({ success: true, username, userCount: room.users.size });
  });

  // تلقي رسالة
  socket.on('send-message', (roomCode, messageData) => {
    const username = usernames.get(socket.id);
    const room = rooms.get(roomCode);

    if (!room) return;

    const message = {
      id: uuidv4(),
      username,
      userId: socket.id,
      text: messageData.text,
      image: messageData.image,
      emoji: messageData.emoji,
      timestamp: new Date().toISOString()
    };

    room.messages.push(message);
    io.to(roomCode).emit('receive-message', message);
  });

  // تغيير اسم المستخدم
  socket.on('change-username', (roomCode, newUsername) => {
    const oldUsername = usernames.get(socket.id);
    usernames.set(socket.id, newUsername);
    io.to(roomCode).emit('username-changed', {
      userId: socket.id,
      oldUsername,
      newUsername
    });
  });

  // حذف رسالة
  socket.on('delete-message', (roomCode, messageId) => {
    const room = rooms.get(roomCode);
    if (!room) return;

    const messageIndex = room.messages.findIndex(m => m.id === messageId);
    if (messageIndex !== -1) {
      const message = room.messages[messageIndex];
      // تحقق أن المستخدم هو صاحب الرسالة فقط
      if (message.userId === socket.id) {
        room.messages.splice(messageIndex, 1);
        io.to(roomCode).emit('message-deleted', messageId);
      }
    }
  });

  // قطع الاتصال
  socket.on('disconnect', () => {
    console.log('مستخدم قطع الاتصال:', socket.id);
    const username = usernames.get(socket.id);
    usernames.delete(socket.id);

    // إزالة المستخدم من جميع الغرف
    rooms.forEach((room, roomCode) => {
      if (room.users.has(socket.id)) {
        room.users.delete(socket.id);
        io.to(roomCode).emit('user-left', {
          username,
          userCount: room.users.size
        });

        // حذف الغرفة إذا كانت فارغة
        if (room.users.size === 0) {
          rooms.delete(roomCode);
        }
      }
    });
  });
});

const PORT = process.env.PORT || 5000;
httpServer.listen(port, '0.0.0.0', () => {
  console.log(`🚀 السيرفر يعمل على البورت ${PORT}`);
});
