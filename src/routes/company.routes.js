import { Router} from 'express'
import { getCompanies, getCompany, addNewCompany, updateCompany, deleteCompany} from '../controllers/company.controller.js'

const router = Router()

router.get('/',getCompanies )

router.get('/:id',getCompany )

router.post('/', addNewCompany)

router.put('/:id', updateCompany)

router.delete('/:id', deleteCompany)

export default router
