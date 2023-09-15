import app from './app.js'
import {connectToDB} from './mongoose.js'

async function main(){
    await connectToDB()
    app.listen(3000)
    console.log('server ruinon on port', 3000)
    
}

main()