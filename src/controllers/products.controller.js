import Product from '../models/product.model.js'
import { uploadImage, deleteImage } from '../cloudinary.js'
import fs from 'fs-extra'

export const getProducts = async (req,res) => {
    try {
        const products = await Product.find()
        res.json(products)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const createProduct = async (req,res) => {
    try {
        const {name, description, price} = req.body
        const product = new Product({
            name,
            description,
            price
        })

        if(req.files?.image){
            const result = await uploadImage(req.files.image.tempFilePath)
            product.image = {
                public_id: result.public_id,
                secure_url: result.secure_url
            }

            await fs.unlink(req.files.image.tempFilePath)
        }

        await product.save()
        res.json(product)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const updateProduct = async (req,res) => {
    try {
        const{id} = req.params
        const productUpdated = await Product.findByIdAndUpdate(id, req.body, {new: true })
            return res.json(productUpdated)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const deleteProduct = async (req,res) => {
    try {
        //eliminamos en la base de datos
        const product = await Product.findByIdAndDelete(req.params.id)
        // eliminamos en cloudinary
        if (product.image?.public_id){
            await deleteImage(product.image.public_id)
        }
        return res.json(product)

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getProduct = async (req,res) => {

    try {
        const product = await Product.findById(req.params.id)

        if (!product) return res.status(404).json({
            message: 'Producto no existe'
        })
        return res.send(product)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

