const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

const socketManager = require('./socketManager.js');
const socket = new socketManager(io);

// routes

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/dashboard/index.html'));
});

app.get('/script', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/dashboard/script.js'));
});

app.get('/style', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/dashboard/index.css'));
});



server.listen(2500, () => {
  console.log("server started");
})
