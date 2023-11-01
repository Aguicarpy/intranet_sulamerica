const { Message, Chat, Officer} = require('../../../db')

const postSendMessage = async(chat_id, sender_id, content, alignment) => {
    try {
        const chat = await Chat.findByPk(chat_id);
        const officer = await Officer.findByPk(sender_id);
        const message = await Message.create({ content });

        // Asocia el mensaje con el chat y el usuario correspondientes
        await message.setChat(chat);
        await message.setOfficer(officer);
        message.alignment = alignment;
        return message;
    } catch (error) {
        throw error;
    }
}

module.exports = postSendMessage;