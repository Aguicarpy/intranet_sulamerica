const { Message, Chat, Officer } = require('../../../db')

const getMessages = async(chatId) => {
    try {
        const messages = await Message.findAll({
            where: { chat_id: chatId },
            include: [{ model: Chat }, {model: Officer}],
            order: [['createdAt', 'ASC']],
        });
        console.log('Mensajes: ', messages.length);
        return messages;
    } catch (error) {
        throw error;
    }
}

module.exports = getMessages;