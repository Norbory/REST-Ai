
const express = require('express')
const morgan = require('morgan')
const router = require('./router')
const mongoConnect = require('../db/index.js')
const passport = require('passport')
const initialiazePassport = require('./config/passport.config')
const session = require('express-session')
const cors = require('cors');


const app = express()

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

// Configurar CORS para permitir todas las solicitudes
app.use(cors());

// Configura express-session
app.use(session({
    secret: 'HarkAI', // Cambia esto a una cadena secreta única y segura
    resave: true,
    saveUninitialized: true
  }));

initialiazePassport()
app.use(passport.initialize())
app.use(passport.session())

router(app)
mongoConnect()

module.exports = app;