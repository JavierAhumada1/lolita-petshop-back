import emailRegistro from '../helpers/emailRegistered.js'
import generateJWT from '../helpers/generateJWT.js'
import User from '../models/userModels.js'
import {v4 as uuidv4} from 'uuid'
import emailForgetPassword from '../helpers/emailForgetPassword.js'


const register = async (req, res) => {
    const {email, name} = req.body
    try {
        const existUser = await User.findOne({email})
        if(existUser){
            const error = new Error('Usuario ya registrado')
            return res.status(400).json({msg: error.message})
        }
        const user = new User(req.body)
        user.role = 'normal'
        const userSaved = await user.save()
        emailRegistro({
            email,
            name,
            token: userSaved.token
        })

        res.status(200).json({
            msg: 'Registrando usuario',
            // para mostrar los datos que se crearon pero no se debe mostrar en el lado del cliente
            // userSaved
        })
    } catch (error) {
        res.status(400).json({msg: 'Usuario ya registrado'})
    }
}

const confirmUser = async (req, res) => {
    const {token} = req.params

    const userConfirm = await User.findOne({token})
    if(!userConfirm){
        const error = new Error('Token no valido')
        return res.status(400).json({
            msg: error.message
        })
    }
    try {
        userConfirm.token = null
        userConfirm.confirm = true
        await userConfirm.save()
        res.status(200).json({
            msg: 'Usuario confirmado correctamente'
        })
    } catch (error) {
        console.log(error)
    }
}

const authenticateUser = async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email}).select({token: 0, __v: 0, role: 0})
    if(!user){
        const error = new Error('El usuario no existe')
        return res.status(400).json({
            msg: error.message
        })
    }
    if(!user.confirm){
        const error = new Error('Tu cuenta no ha sido confirmada')
        return res.status(400).json({
            msg: error.message
        })
    }
    if(await user.checkPassword(password)){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            cp: user.cp,
            district: user.district,
            dni: user.dni,
            lastName: user.lastName,
            phone: user.phone,
            discription: user.discription,
            streetCode:  user.streetCode,
            token: generateJWT(user.id)
        })
    }else {
        const error = new Error('El password es incorrecto')
        return res.status(400).json({
            msg: error.message
        })
    }
}

const profile = (req, res) => {
    const { user } = req
    res.json(user)
}

const forgetPassword = async(req, res) => {
    const {email} = req.body
    const existUser = await User.findOne({email})
    if(!existUser){
        const error = new Error('El usuario no existe')
        return res.status(400).json({msg: error.message})
    }
    try {
        existUser.token = uuidv4()
        await existUser.save()
        emailForgetPassword({
            email,
            name: existUser.name,
            token: existUser.token
        })
        res.status(200).json({msg: 'Hermos enviado un mensaje con las instrucciones'})
        
    } catch (error) {
        console.log(error)
    }
}

const checkToken = async(req, res) => {
    const {token} = req.params
    const tokenValid = await User.findOne({token})
    if(tokenValid){
        res.status(200).json({msg: 'Token valido'})
    }else{
        const error = new Error('Tokeb no valido')
        return res.status(200).json({msg: error.message})
    }
}

const newPassword = async(req, res) => {
    const {token} = req.params
    const {password} = req.body

    const user = await User.findOne({token})
    if(!user){
        const error = new Error('Hubo un error')
        return res.status(400).json({msg: error.message})
    }
    try {
        user.token = null,
        user.password = password
        await user.save()
        res.status(200).json({msg: 'Password modificado correctamente'})
    } catch (error) {
        console.log(error)
    }
}

const updateProfile = async(req, res) => {
    const user = await User.findById(req.params.id)
    if(!user){
        const error = new Error('Hubo un error')
        return res.status(400).json({msg: error.message})
    }
    const {email} = req.body
    if(user.email !== req.body.email){
        const existEmail = await User.findOne({email})
        if(existEmail){
            const error = new Error('Ese email ya esta en uso')
            return res.status(400).json({msg: error.message})
        }
    }

    try {
        user.name = req.body.name
        user.email = req.body.email
        user.lastName = req.body.lastName
        user.cp = req.body.cp
        user.streetCode = req.body.streetCode
        user.district = req.body.district
        user.phone = req.body.phone
        user.description = req.body.description
        user.dni = req.body.dni

        const updatedUser = await user.save()
        res.status(200).json(updatedUser)
    } catch (error) {
        console.log(error)   
    }
}

const updatePassword = async(req, res) => {
    const {id} = req.user
    const {pwd_current, pwd_new} = req.body
    const user = await User.findById(id)
    if(!user){
        const error = new Error('Hubo un error')
        return res.status(400).json({msg: error.message})
    }
    if(await user.checkPassword(pwd_current)){
        user.password = pwd_new
        await user.save()
        res.status(200).json({msg: 'Password guardado correctamente'})
    }else{
        const error = new Error('El password actual es incorrecto')
        return res.status(400).json({msg: error.message})
    }
}


export {
    register,
    confirmUser,
    authenticateUser,
    forgetPassword,
    checkToken,
    newPassword,
    profile,
    updateProfile,
    updatePassword
}