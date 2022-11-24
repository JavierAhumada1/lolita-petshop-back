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

        res.status(200).json({
            msg: 'Registrando usaurio',
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
        res.status(400).json({
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

export {
    register,
    confirmUser
}