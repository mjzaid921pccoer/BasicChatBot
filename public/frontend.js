// Make connection 1.6
var socket = io.connect('http://localhost:4000');

// Query DOM 1.7
var message = document.getElementById('message'),
username = document.getElementById('username'),
      send = document.getElementById('send'),
      conversation = document.getElementById('conversation'),
      feedback = document.getElementById('feedback');
var ele=document.getElementById("new");

//1.8.0
message.addEventListener('keypress', function(){
    socket.emit('typing', username.value);
});
//1.8.3
socket.on('typing', function(data){
    if(data==''){
        data='You';
    }
    feedback.innerHTML = '<p><em>' + data + ' typing a message...</em></p>';
});

// Emit events 1.8.4
send.addEventListener('click', function(){
    //1.8.5
    socket.emit('chat', {
        message: message.value,
        username: username.value
    });
    message.value = "";
});

// Listen for events 1.8.8
socket.on('chat', function(data){
    feedback.innerHTML = '';
    if(data.username==''){
        data.username='You';
    }
    conversation.innerHTML += '<p><strong>' + data.username + ': </strong>' + data.message + '</p>';
    ele.scrollIntoView();
});



