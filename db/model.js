const Sequelize = require('sequelize')
let db

if(process.env.DATABASE_URL) {
    db = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    })
} else {
    db = new Sequelize({
        dialect: 'sqlite',
        storage: __dirname + '/test.db',
    })
}

// if(process.env.DATABASE_URL) {
//     db = new Sequelize(process.env.DATABASE_URL)
// } else {
//     db = new Sequelize('mydb','postgres','27395136',
//     {
//         dialect: 'postgres',
//     })
// }

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