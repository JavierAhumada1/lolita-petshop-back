import express from 'express'
import { register, confirmUser } from '../controllers/userController.js'

const router = express.Router()
router.post('/', register)
router.get('/confirm/:token', confirmUser)

export default router