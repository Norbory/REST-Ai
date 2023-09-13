import { uploadImage, deleteImage } from '../../db/cloudinary.js'
import fs from 'fs-extra'
import { IncidentDAO } from '../dao/class/dao.incident.js'

const Incident = new IncidentDAO


// Ruta para que la Jetson envíe la información y la imagen
export const sendDataJetson = async (req, res) => {

  try {
    const { ID_Company, ID_Area, ID_Cam, image } = req.body
    // Subir la imagen a Cloudinary si hay
    if(req.files?.image){
        const imageUrl = result.secure_url
        const result = await uploadImage(req.files.image.tempFilePath)
        product.image = {
            public_id: result.public_id,
            secure_url: result.secure_url
        }

        await fs.unlink(req.files.image.tempFilePath)
    }

    // Agregar el incidente utilizando el DAO de incidentes
    const newIncident = await Incident.addIncident(ID_Company, {
      ID_area: ID_Area,
      ID_Cam: ID_Cam,
      imageUrls: [imageUrl]
    });

    res.json({ message: 'Incidente registrado exitosamente.', newIncident })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
