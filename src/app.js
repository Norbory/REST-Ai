
const app = require('./index')
const {port} = require('./config')


const httpserver = app.listen(port, ()=>{
    console.log('listening on port ' + port)
})

  