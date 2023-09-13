import { Router} from 'express'
import { getIncidents, addNewIncident, updateIncident} from '../controllers/incident.controller.js'
import fileUpload from "express-fileupload"


const router = Router()

router.get('/:companyId/incidents', getIncidents)

router.post('/:companyId/incidents', addNewIncident)

router.put('/:companyId/incidents/:incidentId', updateIncident)

export default router