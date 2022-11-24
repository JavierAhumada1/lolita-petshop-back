import express from 'express'
import { register, confirmUser, authenticateUser } from '../controllers/userController.js'

const router = express.Router()
router.post('/', register)
router.get('/confirm/:token', confirmUser)
router.post('/login', authenticateUser)

export default router