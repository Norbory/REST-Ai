import { Router} from 'express'
import { getAreas, addNewArea} from '../controllers/area.controller.js'

const router = Router()

router.get('/:companyId/areas',getAreas)

router.post('/:companyId/areas',addNewArea)

export default router