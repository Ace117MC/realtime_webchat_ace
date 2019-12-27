const Sequelize = require('sequelize')
let db

if(process.env.CLEARDB_DATABASE_URL) {
    db = new Sequelize(process.env.CLEARDB_DATABASE_URL)
} else {
    db = new Sequelize({
        dialect: 'sqlite',
        storage: __dirname + '/test.db',
    })
}

// const db = new Sequelize({
//     dialect: 'sqlite',
//     storage: __dirname + '/test.db',
// })

const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    }
})

const Chat = db.define('chat' , {
    message: {
        type: Sequelize.STRING,
    },
    reciever: {
        type: Sequelize.INTEGER
    }
})

Chat.belongsTo(User)
User.hasMany(Chat)

module.exports = {
    db,
    Chat,
    User,
}