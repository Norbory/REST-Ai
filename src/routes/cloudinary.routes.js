import { Router} from 'express'
import { sendDataJetson} from '../controllers/cloudinary.controller.js'
import fileUpload from "express-fileupload"
const router = Router()

router.post('/send-incident',fileUpload({useTempFiles: true, tempFileDir: './uploads'}), sendDataJetson)

export default router