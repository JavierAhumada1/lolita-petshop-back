import express from 'express'
import { createAccessorie } from '../controllers/accessoriesController.js'

const router = express.Router()

router.post('/', createAccessorie)

export default router