import express from "express"
import morgan from "morgan"
import cors from 'cors'
import fileUpload from "express-fileupload"

import indexRoutes from './routes/index.routes.js'
import userRoutes from './routes/users.routes.js'
import areaRoutes from './routes/area.routes.js'
import companyRoutes from './routes/company.routes.js'
import incidentRoutes from './routes/incident.routes.js'
import jetsonRoutes from './routes/jetson.routes.js'
import cloudinaryRouters from './routes/cloudinary.routes.js'

const app= express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())


//routes
app.use(indexRoutes)
app.use(userRoutes)
app.use(areaRoutes)
app.use(companyRoutes)
app.use(incidentRoutes)
app.use(jetsonRoutes)
app.use(cloudinaryRouters)


export default app