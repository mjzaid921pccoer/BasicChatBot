//packages used 1.1
const path=require('path');
const express = require('express');
const socket = require('socket.io');

const publicPath=path.join(__dirname,"/public");
console.log(publicPath);
// App setup 1.2
var app = express();
const PORT=process.env.PORT || 4000;
var server = app.listen(PORT, function(){
    console.log('server setup done PORT:',PORT);
});

// Static files 1.3
app.use(express.static(publicPath));

// Socket setup & pass server 1.4
var io = socket(server);
io.on('connection', (socket) => {
    //1.5
    console.log('Connected Client : ', socket.id);
    botreply.message=menu;
    socket.emit('chat',botreply);

    // Handle typing event 1.8.1
    socket.on('typing', function(data){
        //1.8.2
        //socket.broadcast.emit('typing', data);
        socket.emit('typing', data);
    });

    // Handle chat event 1.8.6
    socket.on('chat', function(data){
        // console.log(data); 1.8.7
        //io.sockets.emit('chat', data);

        socket.emit('chat',data);
        chatbotReply(data);        
        socket.emit('chat',botreply);
    });
});

//CHAT BOT
var menu=["Hi, how may I help you?<br/>","Please reply with the numbers to the corresponding questions.<br/> 1.what is IP? <br/>2. How is IP? <br/>3.Bitrix24 Issues <br/>4.IP training issues <br/> 5.Jobs available"];
var rep1="Watch the below video <br/> <a href=\"https://www.youtube.com/watch?time_continue=142&v=OnKfrQrEOrk&feature=emb_logo\" target=\"_blank\">URL</a>: <iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/OnKfrQrEOrk\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe> <br/> Need any more assistance reply with *";
var rep2="Watch the below video <br/> <a href=\"https://www.youtube.com/watch?v=Hs9npUUIg4I&feature=emb_logo\" target=\"_blank\">URL</a>: <iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/Hs9npUUIg4I\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe> <br/> Need any more assistance reply with * ";
var rep3="Please reply with the corresponding <br/> Question number to get your queries Cleared.<br/> 1.question1 <br/> 2.Question2 <br/> 3.Question3 <br/> 4.Question4 <br/> 5.Question5 <br/> Reply with * to go back to the previous menu";
var rep3_1="Answer to question 1: <br/> Reply with * to go back to the previous menu.";
var rep3_2="Answer to question 2: <br/> Reply with * to go back to the previous menu.";
var rep3_3="Answer to question 3: <br/> Reply with * to go back to the previous menu.";
var rep3_4="Answer to question 4: <br/> Reply with * to go back to the previous menu.";
var rep3_5="Answer to question 5: <br/> Reply with * to go back to the previous menu.";
var rep4_link="<a href=\"https://docs.google.com/document/d/1fCdmvD2oaQ-9gxW8LN4SYazK_rfx2ylX_g3-4V7ujtc/edit\" target=\"_blank\">click here</a>";
var rep5_link="<a href=\"https://docs.google.com/document/d/1hvUpHJH5L8UTyets-gw8XYZ-gIv2jzofM3I6Uy7HuO8/edit\" target=\"_blank\">click here</a>";
var wrongChoice="";
var chatbot_reply=[menu,]
var botreply={
    username:'BOT',
    message:''
}
var subreply3='0';
function chatbotReply(data){
    console.log(data);
  
    if(data.message=='1' && subreply3=='0'){
        botreply.message=rep1;
    }else if(data.message=='2' && subreply3=='0'){
        botreply.message=rep2;
    }else if(data.message=='3' && subreply3=='0'){
        botreply.message=rep3;
        subreply3='1';
    }else if(data.message=='4' && subreply3=='0'){
        botreply.message=rep4_link;
    }else if(data.message=='5' && subreply3=='0'){
        botreply.message=rep5_link;
    }else if(data.message=='*' && subreply3=='0'){
        botreply.message=menu[1];
    }else if(data.message=='1' && subreply3=='1'){
        botreply.message=rep3_1;
    }else if(data.message=='2' && subreply3=='1'){
        botreply.message=rep3_2;
    }else if(data.message=='3' && subreply3=='1'){
        botreply.message=rep3_3;
    }else if(data.message=='4' && subreply3=='1'){
        botreply.message=rep3_4;
    }else if(data.message=='5' && subreply3=='1'){
        botreply.message=rep3_5;
    }else if(data.message=='*' && subreply3=='1'){
        botreply.message=menu[1];
        subreply3='0';
    }else if(subreply3=='1'){
        botreply.message=rep3;
        subreply3='0';
    }else{
        botreply.message=menu[1];
    }
}
