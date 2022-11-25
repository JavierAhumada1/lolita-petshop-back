import mongoose, { Types } from "mongoose";

const foodShema = mongoose.Schema({
    type: {type: String, required: true},
    weight: {type: Types.Decimal128, requered: true},
    name: {type: String, required: true},
    age: {type: String, required: true},
    brand: {type: String, required: true},
    date: {type: String, required: true},
    stock: {type: Number, required: true},
    price: {type: Number, required: true},

})

const Food = mongoose.model('Food', foodShema);
export default Food