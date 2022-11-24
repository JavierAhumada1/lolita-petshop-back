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

        res.status(200).josn({
            msg: 'Registrando usaurio',
            userSaved
        })
    } catch (error) {
        console.log(error)
    }
}

export {
    register
}