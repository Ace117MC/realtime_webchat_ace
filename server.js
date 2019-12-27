const express = require('express')
const http = require('http')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const PORT = process.env.PORT || 7878

const { db } = require('./db/model')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

let users = []

io.on('connection' ,(socket) => {
    // console.log(socket.id)

    // users.push({
    //     id: socket.id,
    //     // username: socket.name
    // })

    // io.emit('rendering')
    
    socket.on('username',(data)=>{
        users.push({
            id: socket.id,
            name: data.username
        })
        // users.set(data.username,socket.id)
        // await users.forEach((user)=>{
        //     if(user.id==data.id) {
        //         user.username = data.username
        //     }
        // })
        io.emit('rendering')
    })

    socket.on('sending' , (data)=>{
        io.to(data.reciever).emit('recieved' , {message: data.message,sender: data.sender})
    })

    socket.on('disconnect',async ()=> {
        users = await users.filter((user)=>{
            return user.id!=socket.id
        })
        // console.log(socket.id)
    })
})

app.use('/api', require('./routes/api/api'))
app.use('/',express.static(__dirname + '/public'))

app.get('/users', (req,res) => {
    res.status(200).send(users)
})


db.sync().then(()=>{
    server.listen(PORT,()=>{
        // console.log('http://localhost:7878')
    })
})
// server.listen(PORT,()=>{
//     // console.log('http://localhost:7878')
// })