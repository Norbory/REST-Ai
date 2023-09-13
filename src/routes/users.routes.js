import { Router} from 'express'
import { getUsers, createUser} from '../controllers/users.controller.js'
import fileUpload from "express-fileupload"


const router = Router()

router.get('/:companyId/users', getUsers)

router.post('/:companyId/users', createUser)

export default router