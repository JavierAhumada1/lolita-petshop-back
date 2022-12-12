import PurchaseOrder from "../models/purchaseOrderModel.js";

const createOrder = async(req, res) => {
    const dataOrder = req.body
    try {
        const purchaseOrder = await PurchaseOrder.create(dataOrder)
        purchaseOrder.payment = false
        purchaseOrder.state = 'Sin enviar'
        purchaseOrder.save()
        res.status(200).json({purchaseOrder})
    } catch (error) {
        console.log(error)
    }
}

export {
    createOrder
}
