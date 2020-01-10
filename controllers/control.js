const {User,Chat} = require('../db/model')

async function newuser(user) {
    return await User.create({
        name: user
    })
}

async function newchat(userId,message,reciever) {
    return await Chat.create({
        userId,
        message,
        reciever
    })
}

async function finduser(user) {
    return await User.findOne({
        where: {name: user}
    })
}

async function messages(id,reciever) {
    const mess = await (Chat.findAll({
        include: [{model: User}],
        where: { '$user.id$': id,reciever: reciever}
    })).map(mes => mes.message)
    return mess
}


module.exports = {
    messages,
    newuser,
    finduser,
    newchat,
}