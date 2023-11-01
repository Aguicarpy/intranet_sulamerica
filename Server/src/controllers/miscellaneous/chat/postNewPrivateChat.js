const { Chat, Officer } = require('../../../db')

const postNewPrivateChat = async(name, isGeneral, userId) => {
    try {
        const chat = await Chat.create({name, isGeneral});
        if (userId) {
            const user = await Officer.findOne({ where: { id: userId } });
            if (user) {
                await chat.addOfficers(user);
            }
        }
        return chat
    } catch (error) {
        throw error
    }
}

module.exports = postNewPrivateChat;