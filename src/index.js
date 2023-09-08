
const express = require('express')
const morgan = require('morgan')
const router = require('./routes')
const mongoConnect = require('../db/index.js')

const app = express()

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))


router(app)
mongoConnect()

module.exports = app;