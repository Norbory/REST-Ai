import { Server as WebSocketServer } from 'socket.io';

const app = require('./index')
const {port} = require('./config')


const httpserver = app.listen(port, ()=>{
    console.log('listening on port ' + port)
})

const io = new WebSocketServer(httpserver, {
    cors: {
        origin: '*',
    }
});

console.log('Socket.io server started')