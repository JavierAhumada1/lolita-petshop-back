import express from 'express'
import { register, confirmUser, authenticateUser, forgetPassword, checkToken, newPassword, profile, updateProfile, updatePassword } from '../controllers/userController.js'

const router = express.Router()

//area publica
router.post('/', register)
router.get('/confirm/:token', confirmUser)
router.post('/login', authenticateUser)
router.post('/olvide-password', forgetPassword)
router.route('/olvide-password/:token').get(checkToken).post(newPassword)

//area privada con JWT
router.get('/perfil', profile)
router.put('/perfil/:id', updateProfile)
router.put('/actualizar-password', updatePassword)


export default router