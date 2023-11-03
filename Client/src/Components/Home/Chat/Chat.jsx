import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useSelector } from "react-redux";
import styles from "./Chat.module.css"
import iconoChat from "../../../assets/iconoChat.png"
const socket = io('http://localhost:3015');

function ChatApp() {
    const user = useSelector((state) => state.dataUser);
    const [chatId, setChatId] = useState(1);
    const [message, setMessage] = useState('');
    const messagesContainerRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const [socketListeners, setSocketListeners] = useState([]);
    const [unreadMessages, setUnreadMessages] = useState(0);
    const [showLoadMoreButton, setShowLoadMoreButton] = useState(false);
    const [scrollToBottom, setScrollToBottom] = useState(true);
  
    useEffect(() => {
      if (scrollToBottom) {
        if (messagesContainerRef.current) {
          messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
      }
    }, [messages, scrollToBottom]);
    
    useEffect(() => {
      socket.emit('joinChat', chatId, user.id);
        const welcomeListener = (message) => {
          console.log(message);
        };
        const handleScroll = () => {
          const container = messagesContainerRef.current;
          if (container) {
            // Verifica si el usuario está en la parte inferior del chat
            const isAtBottom = container.scrollHeight - container.clientHeight <= container.scrollTop + 1;
            if (isAtBottom) {
              setScrollToBottom(true);
              setShowLoadMoreButton(false);
              setUnreadMessages(0);
            } else {
              setScrollToBottom(false);
            }
          }
        };
        
        const messageInChatGeneralListener = (data) => {
          const newMessage = data.newMessage;
          console.log('Mensaje enviado cliente: ', newMessage);
          // Determina la alineación en función del remitente
          const alignment = newMessage.sender_id === user.id ? 'right' : 'left';
          newMessage.alignment = alignment;
          
          setMessages((prevMessages) => [...prevMessages, newMessage]);
          console.log(newMessage);
          
          if (messagesContainerRef.current) {
            const container = messagesContainerRef.current;
            const isScrolledToBottom =
            container.scrollHeight - container.clientHeight <= container.scrollTop + 1;
            
            if (newMessage.sender_id !== user.id && !isScrolledToBottom) {
              setUnreadMessages((prevUnreadMessages) => prevUnreadMessages + 1);
            }
            
            if (isScrolledToBottom) {
              setScrollToBottom(true);
            } else {
              setShowLoadMoreButton(true);
              setScrollToBottom(false);
            }
          }
        };
        
        const previousMessagesListener = (previousMessages) => {
          if (previousMessages && Array.isArray(previousMessages)) {
            setMessages((prevMessages) => [...prevMessages, ...previousMessages]);
          } else {
            console.error('previousMessages no es un array válido:', previousMessages);
            }
        };
        const unreadMessages = (unreadMessages) => {
          // Maneja los mensajes no leídos, puedes agregarlos al estado de mensajes
          setMessages((prevMessages) => [...prevMessages, ...unreadMessages]);
          setUnreadMessages(0); // Resetea el contador de mensajes no leídos
          
          // Luego, desplázate al último mensaje cargado (el último mensaje no leído)
          if (messagesContainerRef.current) {
            const container = messagesContainerRef.current;
            container.scrollTop = container.scrollHeight;
          }
        }
        
        socket.on('welcomeMessage', welcomeListener);
        socket.on('messageInChatGeneral', messageInChatGeneralListener);
        socket.on('previousMessages', previousMessagesListener)
        socket.on('unreadMessagesLoaded', unreadMessages);
        
        setSocketListeners([welcomeListener, messageInChatGeneralListener, previousMessagesListener]);
        if (messagesContainerRef.current) {
          messagesContainerRef.current.addEventListener('scroll', handleScroll);
        }
        return () => {
          // Limpieza cuando el componente se desmonta
          const container = messagesContainerRef.current;
          if (container) {
            container.removeEventListener('scroll', handleScroll);
          }
          socket.emit('leaveChat', chatId);
          // Eliminar los manejadores de eventos
          socketListeners.forEach((listener, index) => {
            socket.off('welcomeMessage', listener);
            socket.off('messageInChatGeneral', listener);
            socket.off('previousMessages', listener);
            socket.off('unreadMessagesLoaded', listener);
          });
        };
      }, [messagesContainerRef]);
   
      const sendMessage = () => {
        if (message) {
          const alignment = 'right';
          socket.emit('sendMessageToChatGeneral', { content: message, chat_id: chatId, alignment, sender_name: user.name, sender_image: user.imageUrl });
          setMessage('');
        }
      }
    
      useEffect(() => {
        if (messages.length > 0 && messages[messages.length - 1].sender_id === user.id) {
          // Desplaza al ultimo mensaje del usuario
          setScrollToBottom(true);
        }
      }, [messages]);

    const loadUnreadMessages = () => {
      setUnreadMessages(0);
      setShowLoadMoreButton(false);
      socket.emit('loadUnreadMessages', chatId, user.id);
      setScrollToBottom(true);
    };

  return (
    <div className={styles.chatContainer}>
      <h2 className={styles.title}>Chat</h2>
      <div className={styles.messageList} ref={messagesContainerRef}>
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`${styles.message} ${message.sender_id === user.id ? styles.rightAlign : styles.leftAlign}`}
                    >
                    {index > 0 && message.sender_id === messages[index - 1].sender_id ? (
                    <div>
                      {message.content}
                    </div>
                    ) : (
                    <div>
                      <div className={styles.messageContent}>
                      <div className={styles.avatar}>
                        <img src={message.sender_image} alt="Avatar" />
                      </div>
                      <div className={styles.messageText}>
                        <strong>{message.sender_name}</strong>
                        <br />
                        {message.content}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
      </div>
        <div className={styles.loadMoreButtonContainer}>
          {unreadMessages > 0 && (
            <button
            onClick={loadUnreadMessages}
            className={`${styles.loadMoreButton} ${showLoadMoreButton ? '' : styles.hidden}`}
            // disabled={!unreadMessages || isScrollingManually}
          >
            <img src={iconoChat} alt="Cargar nuevos mensajes" />
            Cargar nuevos mensajes({unreadMessages})
          </button>
          )}
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
