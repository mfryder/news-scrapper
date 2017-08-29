const config = require("config");
const socketChannelsEnum = require("../enum/SocketMessageTypeEnumeration");
const socketClient = require("./socketClient");
const logger = require('winston');

let server;
let io;
let connectedUsers = {};

class socketServer{
    static initializeServer(){
        let that = this;
        server = require(config.socketServer.protocol).createServer()
        io = require('socket.io')(server, {
            pingInterval: config.socketServer.pingInterval,
            pingTimeout: config.socketServer.pingTimeout,
            cookie: config.socketServer.cookie,
            transports: config.socketServer.transports
        });
        server.listen(config.socketServer.port);
        logger.info("server setup");
        socketClient.initializeClient();
        io.on('connection', function(socket){
            logger.info("in connection");
            that.initializeChannels(socket);
            io.emit(socketChannelsEnum.SYSTEMMESSAGE, {msg: socket.id + " connected"});
            connectedUsers[socket.id] = socket;
            logger.info("socketId: " + socket.id);
        })
    }

   

    static initializeChannels(socket){
        let that = this;
        socket.on(socketChannelsEnum.PRIVATEMESSAGE, (data) => {
            logger.info("Server:");
            logger.info(data);
            if(data.to === undefined){
                socket.broadcast.emit(socketChannelsEnum.PRIVATEMESSAGE, {"from": socket.id, "to": "all", "msg": data.msg})
            }else{
                socket.to(data.to).emit(socketChannelsEnum.PRIVATEMESSAGE, {"from": socket.id, "to": data.to, "msg": data.msg});
            }
        });

        socket.on(socketChannelsEnum.PROFILEUPDATE, (data) => {
            logger.info("Server:");
            logger.info(data);
            if(data.to === undefined){
                socket.broadcast.emit(socketChannelsEnum.PROFILEUPDATE, {"from": socket.id, "to": "all", "msg": data.msg})
            }else{
                socket.to(data.to).emit(socketChannelsEnum.PROFILEUPDATE, {"from": socket.id, "to": data.to, "msg": data.msg});
            }
        });

        socket.on(socketChannelsEnum.RECORDUPDATE, (data) => {
            logger.info("Server:");
            logger.info(data);
            if(data.to === undefined){
                socket.broadcast.emit(socketChannelsEnum.RECORDUPDATE, {"from": socket.id, "to": "all", "msg": data.msg})
            }else{
                socket.to(data.to).emit(socketChannelsEnum.RECORDUPDATE, {"from": socket.id, "to": data.to, "msg": data.msg});
            }
        });

        socket.on('disconnect', function(){
            io.emit(socketChannelsEnum.SYSTEMMESSAGE, {msg: socket.id + " disconnected"});
        });
    }
}

module.exports = socketServer;