const { Router } = require('express')

const {
    newuser,
    messages,
    finduser,
    newchat,
} = require('../../controllers/control')

const route = Router()

route.get('/messages/:id/:reciever' , async (req,res)=> {
    console.log(req.params)
    const chat = await messages(req.params.id,req.params.reciever)
    res.status(200).send(chat)
})

route.post('/user', async (req,res) => {
    const user = await newuser(req.body.user)
    res.status(201).send()
})

route.post('/chat', async (req,res) => {
    const chat = await newchat(req.body.userId,req.body.chat,req.body.reciever)
    res.status(201).send(chat)
})

route.get('/user/:name', async (req,res) => {
    const find = await finduser(req.params.name)
    if(!find) {
        res.status(404).send()
    }
    else {
        res.status(200).send(find)
    }
})

module.exports = route