const WebSocket = require('ws');

function Messaging() {
	this.ws = null;
	this.events = {};
}

Messaging.prototype._handleMessage = function(type, message) {
	if (this.events[type])
		this.events[type](message);
	else
		console.log(type, message)
}

Messaging.prototype._send = function(message) {
	if (this.ws != null) {
		this.ws.send(JSON.stringify(message), function error(error) {
			if (error)
				console.log(error);
		});
	}
}

Messaging.prototype.connect = function(){
	this.ws = new WebSocket('ws://localhost:8765/ws');

	var msgthis = this;

	this.ws.on("message", function incoming(json, flags) {
		let data = JSON.parse(json)
		msgthis._handleMessage(data["type"], data["message"]);
	});

	this.ws.on("error", function(event){
		var connrefused_regex = /ECONNREFUSED/;
		if (connrefused_regex.exec(event.toString().split("\n")[0])){
			msgthis._handleMessage("connection_refused", null);
		}
	});
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

Messaging.prototype.videoStatus = function(playing){
	let message = {
		"type": "video_status",
		"message": {
			"status": playing ? "play" : "pause"
		}
	};

	this._send(message);
}

Messaging.prototype.loadVideo = function(video){
	let message = {
		"type": "load_video",
		"message": {
			"video": video
		}
	}

	this._send(message);
}

module.exports = Messaging;

Messaging.prototype.on = function(type, func) {
	this.events[type] = func;
}