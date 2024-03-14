const multer = require('multer');
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

// Configuración de multer para manejar la carga de archivos
const upload = multer({ dest: 'uploads/' });

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
// Ruta para la transcripción de archivos
app.post('/transcribe', upload.single('file'), async (req, res) => {
  try {
      const fileUrl = req.file.path; // Obteniendo la ruta del archivo
      if (!fileUrl) {
          throw new Error('No se ha proporcionado ningún archivo');
      }

      // Aquí puedes llamar a tu función run() pasándole la URL del archivo
      const transcript = await run(fileUrl);

      // Envía la transcripción como respuesta
      res.send(transcript);
  } catch (error) {
      console.error("Error transcribing audio:", error);
      res.status(500).json({ error: "Error transcribing audio" });
  }
});

mongoConnect()

module.exports = app;