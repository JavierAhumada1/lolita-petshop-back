import express from 'express'
import { createProduct, deleteProduct, readAll, readProductById, updateProduct } from '../controllers/foodController.js'
import checkAuth from '../middleware/authMiddleware.js'

const router = express.Router()

//area publica
router.post('/', createProduct)
router.get('/:id', readProductById)
router.get('/', readAll)

//area privada
router.patch('/:id', updateProduct)
router.delete('/:id', checkAuth ,deleteProduct)

export default router