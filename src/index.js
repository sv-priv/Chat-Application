const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const Filter = require('bad-words');
const app = express();
const server = http.createServer(app)
const io = socketio(server); //socketio da raboti so raw http server
const { generateMessage } = require('./utils/messages')
const { generateLocationMessage } = require('./utils/locationMessage')
const { addUser, removeUser, getUser, getUsersInRoom}  = require('./utils/users')



const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname,'../public')

app.use(express.static(publicDirectoryPath))


io.on('connection', (socket)=>{

    console.log("New WebSocket connection");

     socket.on('join', ({ username, room }, callback) => {

        const { error, user } = addUser({ id: socket.id, username, room })

        if(error){
            return callback(error)
        }

         socket.join(user.room);

         socket.emit('message', generateMessage('Welcome!', "System"))

         socket.broadcast.to(user.room).emit('message', generateMessage(`${user.username} has joined the chat`, "System"))

         io.to(user.room).emit('roomData', {
             room:user.room,
             users: getUsersInRoom(user.room)
         })

         callback()

     })

     socket.on('sendMessage', (message, callback) => {

        const user = getUser(socket.id)

        const filter = new Filter();
        if(filter.isProfane(message)){
            return callback("Profanity is not allowed")
        }
         io.to(user.room).emit('message',generateMessage(message, user.username));
         callback()
     })


     socket.on('sendLocation',(coords, callback)=>{
        const user = getUser(socket.id)

        io.to(user.room).emit('locationMessage', generateLocationMessage(`https://google.com/maps?q=${coords.latitude},${coords.longitude}`, user.username));
        callback("Location Shared")
    })

     socket.on('disconnect', ()=>{

         const user = removeUser(socket.id);

         if(user){
            io.to(user.room).emit('message',generateMessage(` ${user.username} has left.`, user.username))
            io.to(user.room).emit('roomData', {
                room:user.room,
                users: getUsersInRoom(user.room)
            })

         }

     })

})

server.listen(port, () =>{

    console.log("Server is up on port " +  port);
})




