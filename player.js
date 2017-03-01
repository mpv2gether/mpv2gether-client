const mpvPlayer = require("node-mpv");
const url = require("valid-url");

// TODO: send websocket events for all of these, to sync with other clients

function Player() {
	this.currentPlayer = null;
}

Player.prototype.initialise = function(wid) {
	var socket;

	if (process.platform == "win32")
		socket = "\\\\.\\pipe\\mpvsocket";
	else
		socket = ""; // TODO: unix/osx sockets

	if (!this.currentPlayer) {
		this.currentPlayer = new mpvPlayer({
			"verbose": true,
			"socket": socket
		}, [
			"--wid=" + wid,
			"--load-scripts=no"
		]);
	}

	console.log("initialised with window id of " + wid);
}

Player.prototype.play = function(media) {
	// TODO: check for file hashes, file browser to select specific file

	var isUrl = url.isUri(media);

	if (isUrl)
		this.currentPlayer.loadStream(media);
	else
		this.currentPlayer.loadFile(media);

	console.log("playing " + media + " as " + (isUrl ? "url" : "file"));
}

Player.prototype.pause = function() {
	if (this.currentPlayer)
		this.currentPlayer.pause();
}

Player.prototype.resume = function() {
	if (this.currentPlayer)
		this.currentPlayer.resume();
};

Player.prototype.stop = function() {
	if (this.currentPlayer)
		this.currentPlayer.stop();
}

Player.prototype.volume = function(vol) {
	if (this.currentPlayer)
		this.currentPlayer.volume(vol);
}

Player.prototype.seek = function(sec) {
	if (this.currentPlayer)
		this.currentPlayer.goToPosition(sec);
}

module.exports = Player;