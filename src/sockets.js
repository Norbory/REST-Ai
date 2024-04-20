const sockets = (io) => {
    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });

        socket.on('client:chat message', (msg)=>{
            io.emit('server:chat message', msg);
        })
    });
};

module.exports = sockets;
