import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import {v4 as uuidv4} from 'uuid'

const usersSchema = mongoose.Schema({
    name: {type: String, required: true, trim: true},
    email: {type: String, required: true, trim: true, unique: true},
    password: {type: String, required: true},
    lastName: {type: String, trim: true},
    cp: {type: Number, trim: true},
    streetCode: {type: String},
    district:{type: String},
    phone: {type: Number},
    description: {type: String},
    dni: {type: Number, trim: true},
    confirm: {type: Boolean, default: false},
    token: {type: String, default: uuidv4()},
    avatar: {type: String},
    role: {type: String}
})

usersSchema.pre('save', async function(next) {
    //si un password fue hasheado no lo vuelva a hashear, lo ignora
    if(!this.isModified('password')){
        //next dice que se vaya al siguiente middleware
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

//comprubea las passsword del formulario con la del model (base de datos)
usersSchema.methods.checkPassword = async function(passswordForm) {
    return await bcrypt.compareSync(passswordForm, this.password)
}

const User = mongoose.model('User', usersSchema);
export default User