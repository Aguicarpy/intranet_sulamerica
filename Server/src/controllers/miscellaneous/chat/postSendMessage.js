const { Message, Chat, Officer} = require('../../../db')

const postSendMessage = async(chat_id, sender_id, content, alignment, sender_name, sender_image) => {
    try {
        const chat = await Chat.findByPk(chat_id);
        const officer = await Officer.findOne({where: {id:sender_id}});
        // console.log(officer);
        const message = await Message.create({ content, sender_name: officer.name, sender_image: officer.imageUrl });

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