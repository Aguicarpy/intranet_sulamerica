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
  // Configurar eventos de Socket.io
io.on('connection', (socket) => {
    console.log('Usuario conectado');
    socket.join('chatGeneral');
    socket.emit('welcomeMessage', '¡Bienvenido al chat general!');
    
    socket.on('joinChat', async (chatId, userId) => {
      try {
        socket.join(chatId);
        users[socket.id] = userId;
        // Recupera los mensajes anteriores desde la base de datos
        const previousMessages = await getMessages(chatId);
    
        // Emite los mensajes anteriores al usuario que se unió
        socket.emit('previousMessages', previousMessages);
      } catch (error) {
        console.error('Error al recuperar los mensajes anteriores:', error);
      }
    });

  
    socket.on('sendMessageToChatGeneral', async(data) => {
      const { content, chat_id } = data;
      const sender_id = users[socket.id]; 
      try {
        const newMessage = await postSendMessage(chat_id, sender_id, content );
        const alignment = sender_id === socket.id ? 'right' : 'left';
        // Emite el mensaje a todos los usuarios en el chat general
        io.to('chatGeneral').emit('messageInChatGeneral', {newMessage, alignment });
      } catch (error) {
        console.error('Error al guardar el mensaje:', error);
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