import express from 'express'
import { createAccessorie, readProductById, readAll } from '../controllers/accessoriesController.js'

const router = express.Router()

router.post('/', createAccessorie)
router.get('/:id', readProductById)
router.get('/', readAll)

export default router