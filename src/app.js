
const app = require('./index')
const port = process.env.PORT || 80


const httpserver = app.listen(port, ()=>{
    console.log('listening on port ' + port)
})

  