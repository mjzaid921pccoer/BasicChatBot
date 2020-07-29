// Make connection 1.6
var socket = io.connect('http://localhost:5000');

// Query DOM 1.7
var message = document.getElementById('message'),
username = document.getElementById('username'),
      send = document.getElementById('send'),
      conversation = document.getElementById('conversation'),
      feedback = document.getElementById('feedback');
var ele=document.getElementById("new");


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
        username: username.value,
        align:"right"
    });
    message.value = "";
});

// Listen for events 1.8.8
socket.on('chat', function(data){
    feedback.innerHTML = '';
    if(data.username==''){
        data.username='You';
    }
    conversation.innerHTML += '<p style="text-align:'+ data.align+'"><strong>' + data.username + ' </strong><br>' + data.message + '</p>';
    ele.scrollIntoView();
});