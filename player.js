const mpv = require("node-mpv");

function Player() {
	this.currentMedia = null;
}

Player.prototype.play = function(media) {
	this.currentMedia = media;
	// TODO:
}

Player.prototype.pause = function() {
	// TODO:
}

Player.prototype.stop = function() {
	// TODO:
}

Player.prototype.skip = function(to) {
	// TODO:
}