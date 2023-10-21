require('dotenv').config()

const config ={
    port : process.env.PORT,
    jwtSecret: process.env.JWT_SECRET || "somesecrettoken",
    mongoDB : process.env.MONGODB,
    CLOUD_NAME: process.env.CLOUDINARY_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET
}

module.exports = config