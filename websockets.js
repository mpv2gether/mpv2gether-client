const WebSocket = require('uws');

function Messaging() {
    var ws = null;
}

// msg = new Messaging();
// msg.connect();

Messaging.prototype.connect = function(){
    this.ws = new WebSocket('ws://localhost:8765/ws');

    this.ws.on("message", function incoming(data, flags) {
        handleMessage(data["type"], data["message"]);
    });
}

Messaging.prototype._send = function(message) {
    if (this.ws != null) {
        ws.send(message, function error(error) {
            
        });
    }
}

Messaging.prototype.createSession = function(nick) {
    let message = {
        "type": "create_message",
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

function handleMessage(type, message) {
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

}

function userJoinedHandler(message) {

}

function userLeftHandler(message) {

}

function messageHandler(message) {

}

function errorHandler(message) {

}