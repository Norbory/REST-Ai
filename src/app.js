
const app = require('./index')
const {port} = require('./config')


const httpserver = app.listen(port, ()=>{
    console.log('listening on port ' + port)
})

const io = require('socket.io')(httpserver, {
    cors: {
        origin: '*',
    }
})


io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');
  
    socket.on('joinCompany', (companyId) => {
      // El cliente se une a la sala de su compañía
      socket.join(companyId);
    });
  
    socket.on('interaction', ({ companyId, userData }) => {
      // Verificar la autenticación y autorización aquí si es necesario
  
      // Emitir el evento solo a la sala de la compañía
      socket.to(companyId).emit('interaction', userData);
    });
  
    socket.on('disconnect', () => {
      console.log('Cliente desconectado');
    });
  });