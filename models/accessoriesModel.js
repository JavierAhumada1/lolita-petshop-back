import mongoose from "mongoose";
const accessoriesShema = mongoose.Schema({
    type: {type: String, required: true},
    name: {type: String, required: true},
    measures: {type: Number, required: true},
    price: {type: Number, required: true},
    code: {type: String, required: true},
    description: {type: String, required: true},
})

const Accessories = mongoose.model('Accessorie', accessoriesShema);
export default Accessories;