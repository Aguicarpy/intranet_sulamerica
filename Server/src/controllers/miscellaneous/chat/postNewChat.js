const { Chat, Officer } = require('../../../db')

const postNewChat = async(name, isGeneral) => {
    try {
        const chat = await Chat.create({name, isGeneral});
        return chat
    } catch (error) {
        throw error
    }
}

module.exports = postNewChat;