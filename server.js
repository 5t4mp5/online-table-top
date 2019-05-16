const express = require('express');
const app = express();
const path = require('path');
const socketio = require('socket.io');

const port = process.env.PORT || 3000;

app.get('/app.js', (req, res, next)=> res.sendFile(path.join(__dirname, 'dist', 'main.js')));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

const server = app.listen(port, ()=> console.log(`listening on port ${port}`));

const io = socketio(server);

io.on('connect', socket => {
    socket.on('stateUpdate', color => {
        "STATE UPDATE";
        socket.broadcast.emit('stateUpdate', color);   
    });
});
