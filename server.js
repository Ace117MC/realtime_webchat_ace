const express = require('express')
const http = require('http')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const PORT = process.env.port || 7878

app.use(express.json())
app.use(express.urlencoded({extended:true}))

let users = []

io.on('connection' ,(socket) => {
    // console.log(socket.id)

    users.push({
        id: socket.id,
    })

    io.emit('rendering')
    
    socket.on('sending' , (data)=>{
        io.to(data.reciever).emit('recieved' , {message: data.message})
    })

    socket.on('disconnect',async ()=> {
        users = await users.filter((user)=>{
            return user.id!=socket.id
        })
        // console.log(socket.id)
    })
})

app.use('/',express.static(__dirname + '/public'))

app.get('/users', (req,res) => {
    res.status(200).send(users)
})



server.listen(PORT,()=>{
    // console.log('http://localhost:7878')
})