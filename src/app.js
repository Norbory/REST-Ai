
const app = require('./index')
const http = require('http')
const {port} = require('./config')
const { Server } = require('socket.io');

const servidor = http.createServer(app);
const httpserver = servidor.listen(port);
console.log('listening on port ' + port)

const io = new Server(httpserver, {
    cors: {
      origin: '*',
    }
  });
sockets(io);