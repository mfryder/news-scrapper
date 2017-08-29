const socketChannels = require("../../config/socketChannels");
const SocketMessageTypeEnum = Object.freeze({
    RECORDUPDATE:   (socketChannels.recordUpdate.channelId),
    PROFILEUPDATE:  (socketChannels.profileUpdate.channelId),
    PRIVATEMESSAGE: (socketChannels.privateMessage.channelId),
    SYSTEMMESSAGE:  (socketChannels.systemMessage.channeliD)
});

module.exports = SocketMessageTypeEnum;