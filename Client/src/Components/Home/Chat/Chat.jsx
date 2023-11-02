import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import axios from "axios"
import { getAllUsers } from '../../../Redux/actions';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "./Chat.module.css"

const socket = io('http://localhost:3015');

function ChatApp() {
    const user = useSelector((state) => state.dataUser);
    const [chatId, setChatId] = useState(1);
    const [message, setMessage] = useState('');
    const messagesContainerRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const [socketListeners, setSocketListeners] = useState([]);
  
    useEffect(() => {
        socket.emit('joinChat', chatId, user.id);
        const welcomeListener = (message) => {
          console.log(message);
        };
    
        const messageInChatGeneralListener = (data) => {
          const newMessage = data.newMessage;
          console.log(`Mensaje recibido en el cliente:
          ${newMessage}`);
          // Determina la alineación en función del remitente
          const alignment = newMessage.sender_id === user.id ? 'right' : 'left';
          newMessage.alignment = alignment;
      
          setMessages((prevMessages) => [...prevMessages, newMessage]);
          if (messagesContainerRef.current) {
              messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
          }
          console.log(newMessage);
        };
    
        const previousMessagesListener = (previousMessages) => {
            if (previousMessages && Array.isArray(previousMessages)) {
                setMessages((prevMessages) => [...prevMessages, ...previousMessages]);
            } else {
                console.error('previousMessages no es un array válido:', previousMessages);
            }
        };
    
        socket.on('welcomeMessage', welcomeListener);
        socket.on('messageInChatGeneral', messageInChatGeneralListener);
        socket.on('previousMessages', previousMessagesListener);
    
        setSocketListeners([welcomeListener, messageInChatGeneralListener, previousMessagesListener]);
    
        return () => {
          // Limpieza cuando el componente se desmonta
          socket.emit('leaveChat', chatId);
    
          // Eliminar los manejadores de eventos
          socketListeners.forEach((listener, index) => {
            socket.off('welcomeMessage', listener);
            socket.off('messageInChatGeneral', listener);
            socket.off('previousMessages', listener);
          });
        };
      }, []);
   
      const sendMessage = () => {
        if (message) {
          const alignment = 'right';
          socket.emit('sendMessageToChatGeneral', { content: message, chat_id: chatId, alignment, sender_name: user.name });
          setMessage('');
      }
    }

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messageList} ref={messagesContainerRef}>
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`${styles.message} ${message.sender_id === user.id ? styles.rightAlign : styles.leftAlign}`}
                    >
                        <div>
      <strong>{message.sender_name}:</strong>
      <br />
      {message.content}
    </div>
                    </div>
                ))}
            </div>
      {/* Interfaz de chat */}
      <div className={styles.inputContainer}>
        <input
        placeholder='Escribe un mensaje'
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={styles.input}
        />
        <button onClick={sendMessage} className={styles.sendButton}>Enviar</button>
      </div>
    </div>
  );
}

export default ChatApp;
