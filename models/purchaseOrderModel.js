import mongoose from "mongoose";

const purchaseSchema = mongoose.Schema({
    name: {type: String, required: true, trim: true},
    id_user: {type: String, required: true, trim: true},
    email: {type: String, required: true, trim: true, unique: true},
    lastName: {type: String, trim: true, required: true},
    cp: {type: Number, trim: true, required: true},
    streetCode: {type: String, required: true},
    district:{type: String, required: true},
    phone: {type: Number, required: true},
    description: {type: String},
    dni: {type: Number, trim: true, required: true},
    date: {type: Date, required: true},
    total: {type: Number, trim: true, required: true},
    payment: {type: Boolean, trim: true, required: true},
    state: {type: String, trim: true, required: true},
    products: [{type: Array, required: true}]

})

const PurchaseOrder = mongoose.model('PurchaseOrders', purchaseSchema)
export default PurchaseOrder