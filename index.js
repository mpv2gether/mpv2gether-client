'use strict';
const electron = require('electron');

const app = electron.app;
const titleBarHeight = 24;
const progressBarHeight = 24;
const chatWidth = 325;

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// prevent window being garbage collected
let mainWindow;
let childWindow;

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	mainWindow = null;
	childWindow = null;
}

function onMoved(stack, things) {
	var pos = mainWindow.getPosition();
	childWindow.setPosition(pos[0], pos[1] + titleBarHeight, true);
}

function onResized() {
	// TODO: maybe?
}

function createChildWindow() {
	var pos = mainWindow.getPosition();
	childWindow = new electron.BrowserWindow({
		parent: mainWindow, 
		width: 1280, 
		height: 720, 
		transparent: true,
		frame: false,
		resizable: false,
	});
	childWindow.setPosition(pos[0], pos[1] + titleBarHeight, false);
	childWindow.setIgnoreMouseEvents(true);
	childWindow.setSkipTaskbar(true);
	childWindow.show();
	childWindow.setAspectRatio(16/9);

	var windowHandle = childWindow.getNativeWindowHandle().readUInt32LE(0);
	global.mpvWindow = windowHandle;
}

function createMainWindow() {
	const win = new electron.BrowserWindow({
		width: 1280 + chatWidth,
		height: 720 + titleBarHeight + progressBarHeight,
		frame: false
	});

	win.loadURL(`file://${__dirname}/index.html`);
	win.on('closed', onClosed);
	win.on("move", onMoved);
	win.on("resize", onResized);

	return win;
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
		createChildWindow();
	}
});

app.on('ready', () => {
	mainWindow = createMainWindow();
	mainWindow.setAspectRatio(16/9, [chatWidth, titleBarHeight + progressBarHeight]); // TODO: figure out why this is completely and utterly broken
	createChildWindow();
});