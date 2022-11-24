import emailRegistro from '../helpers/emailRegistered.js'
import generateJWT from '../helpers/generateJWT.js'
import User from '../models/userModels.js'

const register = async (req, res) => {
    const {email, name} = req.body
    try {
        const existUser = await User.findOne({email})
        if(existUser){
            const error = new Error('Usuario ya registrado')
            return res.status(400).json({msg: error.message})
        }
        const user = new User(req.body)
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
        console.log(error)
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

    const user = await User.findOne({email})
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
            token: generateJWT(user.id)
        })
    }else {
        const error = new Error('El password es incorrecto')
        return res.status(400).json({
            msg: error.message
        })
    }
}

export {
    register,
    confirmUser,
    authenticateUser
}