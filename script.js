'use strict';

// electron app

const electron = require('electron');
require('electron-reload')(__dirname, {
  electron: require(`${__dirname}/node_modules/electron`),
});
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');

// app.on("ready", createWindow)

app.on('ready', () => {
  function createWindow(displayNumber, htmlName) {
    let displays = electron.screen.getAllDisplays();
    let win = new BrowserWindow({
      frame: false,
      kiosk: true,
      x: displays[displayNumber].bounds.x,
      y: displays[displayNumber].bounds.y,
    });
    win.show();
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, htmlName),
        protocol: 'file',
        slashes: true,
      })
    );
    win.webContents.openDevTools();
    win.on('closed', () => {
      win = null;
    });
  }
  createWindow(1, 'pre.html');
  createWindow(0, 'main.html');
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// main code

const slectedPhoto = document.querySelector('#photo');

// console.log(slectedPhoto);

// // const addphoto = function () {};

// // slectedPhoto.addEventListener('click', addphoto);

// // const arrowLeft = document.querySelector('#left');
// // const arrowRight = document.querySelector('#right');
