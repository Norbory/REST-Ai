const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const IncidentDAO = require('../dao/class/dao.incident');
const { CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = require('./config');

const Incident = new IncidentDAO;

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
});

// Ruta para que la Jetson envíe la información y la imagen
router.post('/send-incident', async (req, res) => {
  const { ID_Company, ID_Area, ID_Cam, image } = req.body;

  try {
    // Subir la imagen a Cloudinary
    const result = await cloudinary.uploader.upload(image, { folder: 'incident-images' });
    const imageUrl = result.secure_url;

    // Agregar el incidente utilizando el DAO de incidentes
    const newIncident = await Incident.addIncident(ID_Company, {
      ID_area: ID_Area,
      ID_Cam: ID_Cam,
      imageUrls: [imageUrl]
    });

    res.json({ message: 'Incidente registrado exitosamente.', newIncident });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
