import mongoose from "mongoose";

const foodShema = mongoose.Schema({
    type: {type: String, requered: true},
    weight: {type: Number, requered: true},
    name: {type: String, requered: true},
    age: {type: Number, requered: true},
    mark: {type: String, requered: true},
    date: {type: String, requered: true},
    stock: {type: Number, requered: true},
    price: {type: Number, requered: true},

})

const Food = mongoose.model('Food', foodShema);
export default Food