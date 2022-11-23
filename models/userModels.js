import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const usersSchema = mongoose.Schema({
    name: {type: String, required: true, trim: true},
    email: {type: String, required: true, trim: true, unique: true},
    password: {type: String, required: true},
    lastName: {type: String, required: true, trim: true},
    Cp: {type: Number, trim: true},
    streetCode: {type: String},
    district:{type: String},
    phone: {type: Number},
    description: {type: String},
    dni: {type: Number, trim: true}

})


//comprubea las passsword del formulario con la del model (base de datos)
usersSchema.methods.checkPassword = async function(passswordForm) {
    return await bcrypt.compareSync(passswordForm, this.password)
}

const User = mongoose.model('User', usersSchema);
export default User