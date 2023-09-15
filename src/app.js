import express from "express"
import morgan from "morgan"
import cors from 'cors'
import fileUpload from "express-fileupload"

import indexRoutes from './routes/index.routes.js'
import productRoutes from './routes/products.routes.js'

const app= express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())


//routes
app.use(indexRoutes)
app.use(productRoutes)

export default app