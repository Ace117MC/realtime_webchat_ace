$('#new-userbutton').on('click' ,async () => {
    if($('#new-user').val()) {
        const username = $('#new-user').val()
        $.get('/api/user/' + username,(data,status)=>{console.log(data,status)},"json")
        .done(()=>{
            window.alert('User Already Exists')
        })
        .fail(()=>{
            $.post('/api/user', {
                user: $('#new-user').val()
            }).done(()=>{
                window.location = '/chat.html?username='+$('#new-user').val()
            })
        })
    }
})

$('#new-user').on('keypress' ,async (event) => {
    if(event.which==13 && $('#new-user').val()) {
        const username = $('#new-user').val()
        $.get('/api/user/' + username,(data,status)=>{console.log(data,status)},"json")
        .done(()=>{
            window.alert('User Already Exists')
        })
        .fail(()=>{
            $.post('/api/user', {
                user: $('#new-user').val()
            }).done(() => {
                window.location = '/chat.html?username='+$('#new-user').val()
            })
        })
    }
})

$('#existing-userbutton').on('click' , async () => {
    if($('#existing-user').val()) {
        const username = $('#existing-user').val()
        $.get('/api/user/' + username ,(data)=>{console.log(data)},"json")
        .done(()=>{
            window.location = '/chat.html?username='+$('#existing-user').val()
        })
        .fail(()=>{
            window.alert('User Does not Exists')
        })
    }
})

$('#existing-user').on('keypress' , async (event) => {
    if( event.which==13 && $('#existing-user').val()) {
        const username = $('#existing-user').val()
        $.get('/api/user/' + username ,(data)=>{console.log(data)},"json")
        .done(()=>{
            window.location = '/chat.html?username='+$('#existing-user').val()
        })
        .fail(()=>{
            window.alert('User Does not Exists')
        })
    }
})