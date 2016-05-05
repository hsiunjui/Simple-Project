var express = require('express');
var http = require('http');
var io = require('socket.io');
var path = require('path');

var app = express();
var server = http.createServer(app);
io = io(server);

app.use(express.static(__dirname));
app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});
//连接成功触发
var users = {};
io.on('connection', function (socket) {
    var username, room;
    socket.emit('message', {user: '系统', msg: '欢迎,请输入昵称'});      //连接成功发送的消息

    socket.on('users',function(){
        io.emit('users',Object.keys(users));
    });

    socket.on('join',function(rm){          //加入房间
        socket.leave(room);
        socket.join(rm);
        room = rm;
    })
    socket.on('message', function (msg) {          //客户端发来的消息
        if (username) {                 //注册了
            var result = msg.match(/@(.+)\s(.+)/);
            if(result){                 //私聊
                var toUser = result[1];
                var content = result[2];
                users[toUser].emit('message',{user:username,msg:content});  //发给对方
                socket.emit('message',{user:username,msg:content});         //发给自己
            }else{              //房间
                io.sockets.in(room).emit('message',{user:username,msg:msg});    //房间广播
                //io.sockets.emit('message',{user:username,msg:msg});     //全员广播
            }
        } else {                    //注册
            username = msg;
            users[username] = socket;
            io.emit('users', Object.keys(users));
            io.emit('message', {user: '系统', msg: '欢迎<span>' + username + '</span>'})
        }
    })
});

server.listen(8080);
