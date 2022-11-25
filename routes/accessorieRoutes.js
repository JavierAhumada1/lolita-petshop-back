import express from 'express'
import { createAccessorie, readProductById, readAll, deleteProduct, updateAccessories } from '../controllers/accessoriesController.js'

const router = express.Router()

//area publica
router.post('/', createAccessorie)
router.get('/:id', readProductById)
router.get('/', readAll)

//area privada
router.delete('/:id', deleteProduct)
router.patch('/:id', updateAccessories)

export default router