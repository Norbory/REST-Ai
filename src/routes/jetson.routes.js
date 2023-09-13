import { Router} from 'express'
import { getJetson, addNewJetson} from '../controllers/jetson.controller.js'
import fileUpload from "express-fileupload"

const router = Router()

router.get('/:companyId/jetsons', getJetson)

router.post('/:companyId/jetsons', addNewJetson )

export default router