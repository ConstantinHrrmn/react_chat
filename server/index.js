// Importations et requires
const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const router = require('./router');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js');

// Port utilisé par le serveur
const PORT = process.env.PORT || 5522;

// Gestion du serveur
const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    console.log('Client CONNECTED');

    // Un utilisateur rejoint une room
    socket.on('join', ({name, room}, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });

        if(error) {
            return callback(error);
        }
            
        socket.emit('message', { user: 'admin', text: `${user.name}, has joined the room : ${user.room}` });
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined the room : ${user.room}` });

        socket.join(user.room);

        callback();
    });

    // Envoyer un message par un utilisateur
    socket.on('sendMessage', (message, callback) => {
        // Récuxperer l'utilisateur grâce à son id
        const user = getUser(socket.id);

        // Envoyer le message à tous les utilisateurs de la room
        io.to(user.room).emit('message', { user: user.name, text: message });

        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

        callback();
    });

    // Déconnexion
    socket.on('disconnect', () => {
        console.log('Client DISCONNECTED');
        const user = removeUser(socket.id);

        if(user) {
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left the room : ${user.room}` });
        }
    });
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(router);

server.listen(PORT, () => console.log(`Server started (${PORT})`));