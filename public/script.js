const socket = io()
let id
let reciever
let recieved

socket.on('connect',() => {
    // console.log(socket.id)
    id=socket.id
    // console.log(id)
    renderlist()
})

socket.on('rendering' ,()=>{
    renderlist()
})

$('#send').on('click' , ()=> {
    if(!reciever) {

    }
    else {
        if($('#message').val()) {

            $('#chat').append(`<div>${$('#message').val()}</div>`)

            socket.emit('sending' , {
                message: '(' + $('#name').val() + ')' + $('#message').val(),
                reciever: reciever
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

                $('#chat').append(`<div>${$('#message').val()}</div>`)

                socket.emit('sending' , {
                    message: '(' + $('#name').val() + '): ' + $('#message').val(),
                    reciever: reciever
                })
            }
        }
        $('#message').val('')
    }
})

socket.on('recieved' , async (data)=>{
    // console.log(data.message)
    recieved = data.message
    renderlist()
})

async function renderlist() {
    $('#curid').html(`${id}`)
    $('#users').html('')
    let users
    $.get('/users',(data)=> {
        users=data
    },"json").done(()=> {
        for(let user of users) {
            let itembox = $('<label class="btn btn-primary mx-1"></label>')
            let item = $(`<input type="radio" name="options">${user.id}</input>`)
            itembox.on('click',async ()=>{
                itembox.button('toggle')
                reciever = user.id
            })
            itembox.append(item)
            $('#users').append(itembox)
        }
        if(recieved) $('#chat').append(`<div>${recieved}</div>`)
    })
}

// renderlist()