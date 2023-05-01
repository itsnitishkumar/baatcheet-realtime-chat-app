// Node server which will handle socker io connection

const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
});

const users = {}

io.on('connection', socket => {
    // If any new user isJSDocImplementsTag, let other users connected to the server know!
    socket.on('user-joined', name => {
        users[socket.id] = name
        socket.broadcast.emit('user-joined', name)
    })

    // If someone sends a message, broacast it to other people
    socket.on('send', message => {
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    })

    // If someone leaves the CharacterData, let others know
    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id]
    })

})