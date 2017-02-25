const WebSocket = require('ws');

function Messaging() {}
Messaging.prototype.ws = null;

// msg = new Messaging();
// msg.connect();

Messaging.prototype.connect = function(){
    this.ws = new WebSocket('ws://localhost:8765/ws');

    this.ws.on("message", function incoming(json, flags) {
        let data = JSON.parse(json)
        handleMessage(data["type"], data["message"]);
    });
}

Messaging.prototype._send = function(message) {
    if (this.ws != null) {
        this.ws.send(JSON.stringify(message), function error(error) {
            console.log(error);
        });
    }
}

Messaging.prototype.createSession = function(nick) {
    let message = {
        "type": "create_session",
        "message": {
            "nick": nick
        } 
    };

    this._send(message);
}

Messaging.prototype.joinSession = function(nick, sessionKey) {
    let message = {
        "type": "join_session",
        "message": {
            "session_key": sessionKey,
            "nick": nick
        }
    }

    this._send(message);
}

Messaging.prototype.chatMessage = function(t_message) {
    let message = {
        "type": "message",
        "message": {
            "message": t_message
        }
    };

    this._send(message);
}

module.exports = Messaging;

function handleMessage(type, message) {
    console.log(type);
    switch(type) {
        case "created_session":
            createdSessionHandler(message);
            break;
        case "user_joined":
            userJoinedHandler(message);
            break;
        case "user_left":
            userLeftHandler(message);
            break;
        case "message":
            messageHandler(message);
            break;
        case "error":
        default:
            errorHandler(message);
            break;
    }
}

// TODO: print useful things to chat :^)
function createdSessionHandler(message) {
    console.log("createdSessionHandler: " + JSON.stringify(message));
}

function userJoinedHandler(message) {
    console.log("userJoinedHandler: " + JSON.stringify(message));
}

function userLeftHandler(message) {
    console.log("userLeftHandler: " + JSON.stringify(message));
}

function messageHandler(message) {
    console.log("messageHandler: " + JSON.stringify(message));
}

function errorHandler(message) {
    console.log("errorHandler: " + JSON.stringify(message));
}