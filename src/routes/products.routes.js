import { Router} from 'express'
import { getProducts, createProduct, updateProduct, deleteProduct, getProduct} from '../controllers/products.controller.js'
import fileUpload from "express-fileupload"

const router = Router()

router.get('/products', getProducts)

router.post('/products',fileUpload({useTempFiles: true, tempFileDir: './uploads'}) , createProduct)

router.put('/products/:id', updateProduct)

router.delete('/products/:id', deleteProduct)

router.get('/products/:id', getProduct)

export default router