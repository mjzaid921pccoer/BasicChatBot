//packages used 1.1
const path=require('path');
const express = require('express');
const socket = require('socket.io');

const publicPath=path.join(__dirname,"/public");
console.log(publicPath);
// App setup 1.2
var app = express();
const PORT=process.env.PORT || 5000;
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
var menu=["Hi, how may I help you?<br/>","Please reply with the numbers to the corresponding questions.<br/> 1.what is IP? <br/>2. How is IP? <br/>3.Bitrix24 Issues <br/>4.IP training issues"];
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


var replies=[
    menu,
    rep1,
    rep2,
    rep3,
    rep4_link
];
console.log(replies[parseInt('1')]);

var botreply={
    username:'BOT',
    message:'',
    align:'left',
}

var subreply3=0;

function chatbotReply(data){
    console.log(data);
    
    if(subreply3==0){
        switch(data.message){
            case '1':
                botreply.message=rep1;
                console.log(replies[parseInt(data.message)]);
                break;
            case '2':
                botreply.message=rep2;
                console.log(replies[parseInt(data.message)]);
                break;
            case '3':
                botreply.message=rep3;
                console.log(replies[parseInt(data.message)]);
                subreply3=1;
                break;
            case '4':
                botreply.message=rep4_link;
                console.log(replies[parseInt(data.message)]);
                break;
            case '*':
                botreply.message=menu[1];
                //console.log(replies[parseInt(data.message)]);
                break;
            default:
                //botreply.message=menu[1];
                botreply.message=menu[1];
            }
    }else if(subreply3==1){
        switch(data.message){
            case '1':
                botreply.message=rep3_1;
                break;
            case '2':
                botreply.message=rep3_2;
                break;
            case '3':
                botreply.message=rep3_3;
                break;
            case '4':
                botreply.message=rep3_4;
                break;
            case '5':
                botreply.message=rep3_5;
                break;
            case '*':
                subreply3=0
                botreply.message=rep3;
                break;
            default:
                botreply.message="Please reply with the numbers to the corresponding questions";

        }
    }

 }
