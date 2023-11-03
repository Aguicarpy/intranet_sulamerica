const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const {server} = require('../app')
const postSendMessage = require('../controllers/miscellaneous/chat/postSendMessage')
const getMessages = require('../controllers/miscellaneous/chat/getMessages')
const httpServer = http.createServer(server);

// Configurar Socket.io en el servidor HTTP
const io = socketIo(httpServer, {
    cors: {
      origin: 'http://localhost:5173', 
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  const users = {};
  const unreadMessages = {};
  // Configurar eventos de Socket.io
io.on('connection', (socket) => {
    console.log('Usuario conectado');
    socket.join('chatGeneral');
    socket.emit('welcomeMessage', '¡Bienvenido al chat general!');
    
    socket.on('joinChat', async (chatId, userId, senderName) => {
      try {
        socket.join(chatId);
        users[socket.id] = userId;
        // Recupera los mensajes anteriores desde la base de datos
        const previousMessages = await getMessages(chatId, senderName);
        // Emite los mensajes anteriores al usuario que se unió
        socket.emit('previousMessages', previousMessages);
        console.log('Mensajes servidor: ', previousMessages);
      } catch (error) {
        console.error('Error al recuperar los mensajes anteriores:', error);
      }
    });

  
    socket.on('sendMessageToChatGeneral', async(data) => {
      const { content, chat_id, sender_name, sender_image } = data;
      const sender_id = users[socket.id]; 
      try {
        const newMessage = await postSendMessage(chat_id, sender_id, content, sender_name, sender_image  );
        console.log('mensaje enviado servidor: ', newMessage);
        const alignment = sender_id === socket.id ? 'right' : 'left';
        // Emite el mensaje a todos los usuarios en el chat general
        if (!unreadMessages[chat_id]) {
          unreadMessages[chat_id] = [];
        }
        unreadMessages[chat_id].push({ newMessage, alignment });
        io.to('chatGeneral').emit('messageInChatGeneral', {newMessage, alignment });
      } catch (error) {
        console.error('Error al guardar el mensaje:', error);
      }
    });
    
    socket.on('loadUnreadMessages', (chatId, userId) => {
      if (unreadMessages[chatId]) {
        socket.emit('unreadMessages', unreadMessages[chatId]);
        delete unreadMessages[chatId];
      }
    });

    socket.on('sendPrivateMessage', (data) => {
      const { recipientId, content } = data;
      // Emite el mensaje al usuario destinatario
      io.to(recipientId).emit('privateMessage', { senderId: socket.id, content });
    });
  
    socket.on('disconnect', () => {
      console.log('Usuario desconectado');
    });
  });

  module.exports = httpServer;