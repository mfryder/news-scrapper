const config = require("config");
const socketChannels = require("../../config/socketChannels");

let ioClient;
let socket;
let initialized = false;

class socketClient{
    static initializeClient(){
        let that = this;
        ioClient = require('socket.io-client')
        socket = ioClient(config.socketServer.protocol+"://localhost:"+config.socketServer.port,{transports: config.socketServer.transports});
        socket.on("connect", function(){
            initialized = true;
        });
    }

    static sendMessage(type, user, msg){
        if(initialized){
            let that = this;
            socket.emit(type, {"to": user, "msg":msg});
        }
    }

    static initializeChannels(){
        socket.on(socketChannelsEnum.PRIVATEMESSAGE, (data) => {
            logger.info("CLIENT "+ socket.id+ ":");
            logger.info(data)
        });

        socket.on(socketChannelsEnum.PROFILEUPDATE, (data) => {
            logger.info("CLIENT "+ socket.id+ ":");
            logger.info(data)
        });

        socket.on(socketChannelsEnum.RECORDUPDATE, (data) => {
            logger.info("CLIENT "+ socket.id+ ":");
            logger.info(data)
        });

        socket.on(socketChannelsEnum.SYSTEMMESSAGE, (data) => {
            logger.info("CLIENT "+ socket.id+ ":");
            logger.info(data)
        });
    }
}

module.exports = socketClient;