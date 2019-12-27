const socket = io()
let id
let reciever
let recieverId
let recieved
let userId


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
// get the required parameter
const username = urlParams.get('username'); // returns the value of parameter 'lan'
$.get('/api/user/'+username,(data)=>{
    userId = data.id
}).done(()=>{
    // renderchat()
}).fail(()=>{
    window.location = '/'
})

console.log(username)

socket.on('connect',() => {
    // console.log(socket.id)
    id=socket.id
    socket.emit('username',{
        username,
        id
    })
    // console.log(id)
    // renderlist()
    $('#curid').html(`${username}`)
    // renderchat()
})

socket.on('rendering' ,()=>{
    renderlist()
})

$('#send').on('click' , ()=> {
    if(!reciever) {

    }
    else {
        if($('#message').val()) {

            $('#chat').prepend(`<div>${$('#message').val()}</div>`)
            $.post('/api/chat',{
                userId,
                chat: $('#message').val(),
                reciever: recieverId
            })

            socket.emit('sending' , {
                // message: '(' + $('#name').val() + ')' + $('#message').val(),
                message: username + ': ' + $('#message').val(),
                reciever: reciever,
                sender: userId
            })
        }
    }
    $('#message').val('')
})

$('#message').on('keypress' , (event)=> {
    if(event.which==13) {    
        if(!reciever) {

        }
        else {
            if($('#message').val()) {

                $('#chat').prepend(`<div>${$('#message').val()}</div>`)
                $.post('/api/chat',{
                    userId,
                    chat: $('#message').val(),
                    reciever: recieverId
                })

                socket.emit('sending' , {
                    // message: '(' + $('#name').val() + '): ' + $('#message').val(),
                    message: username + ': ' + $('#message').val(),
                    reciever: reciever,
                    sender: userId
                })
            }
        }
        $('#message').val('')
    }
})

socket.on('recieved' , async (data)=>{
    // console.log(data.message)
    recieved = data.message
    // $('#chat').prepend(`<div>${recieved}</div>`)
    await $.post('/api/chat',{
        userId,
        chat: recieved,
        reciever: data.sender
    })
    renderchat()
})

async function renderlist() {
    // $('#curid').html(`${username}`)
    $('#users').html('')
    let users
    $.get('/users',(data)=> {
        users=data
    },"json").done(()=> {
        console.log(users)
        for(let user of users) {
            let itembox = $('<label class="btn btn-primary mx-1"></label>')
            let item = $(`<input type="radio" name="options">${user.name}</input>`)
            itembox.on('click',async ()=>{
                if(user.name != username) {
                    itembox.button('toggle')
                    reciever = user.id
                    $.get('/api/user/'+user.name , (data)=>{
                        recieverId = data.id
                    }).done(()=>{
                        renderchat()
                    })
                }
            })
            itembox.append(item)
            $('#users').append(itembox)
        }
        // if(recieved) $('#chat').append(`<div>${recieved}</div>`)
    })
}

async function renderchat() {
    let messages
    $('#chat').html('')
    console.log(userId,recieverId)
    $.get('/api/messages/'+userId+'/'+recieverId, (data)=>{
        messages = data
        console.log(messages)
    }).done(()=>{
        for(let message of messages) {
            $('#chat').prepend(`<div>${message}</div>`)
        }
    })
}


// renderlist()