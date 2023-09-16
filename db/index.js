const {mongoDB} = require('../src/config')
const mongoose = require('mongoose')


const mongoConnect = async () => {
    try {
      console.log('mongoDB: ', mongoDB)
      await mongoose.connect(
        mongoDB
      )
      console.log('db is connected')
    } catch (error) {
      console.log(error)
      console.log('db is NOT connected')
    }
  }

  module.exports = mongoConnect