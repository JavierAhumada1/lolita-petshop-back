import Accessories from "../models/accessoriesModel.js";

const createAccessorie = async(req, res) => {
    const dataAccessorie = req.body
    try {
        const accessorie = await Accessories(dataAccessorie)
        await accessorie.save()
        res.status(200).json({msg: 'Producto creado', accessorie})
    } catch (error) {
        console.log(error)
    }
}

const readProductById = async(req, res) => {
    const {id} = req.params
    const accessorie = await Accessories.findById(id)
    if(!accessorie){
        const error = new Error('No se encontro ese producto')
        return res.status(400).json({msg: error.message})
    }
    res.status(200).json({accessorie})
}

const readAll = async(req, res) => {
    const accessories = await Accessories.find()
    res.status(200).json({accessories})
}

const deleteProduct = async(req, res) => {
    const {id} = req.params
    const accessorie = await Accessories.findById(id)
    if(!accessorie){
        const error = new Error('Hubo un error')
        return res.status(400).json({msg: error.message})
    }
    try {
        await accessorie.deleteOne()
        res.status(200).json({msg: 'Producto eliminado'})
    } catch (error) {
        console.log(error)
    }
}

const updateAccessories = async(req, res) => {
    const {id} = req.params
    const accessorie = await Accessories.findById(id)
    if(!accessorie){
        const error = new Error('Producto no encontrado')
        return res.status(400).json({msg: error.message})
    }

    accessorie.type = req.body.type || accessorie.type
    accessorie.name = req.body.name || accessorie.name
    accessorie.measures = req.body.measures || accessorie.measures
    accessorie.price = req.body.price || accessorie.price
    accessorie.code = req.body.code || accessorie.code
    accessorie.description = req.body.description || accessorie.description
    try {
        const accessorieUpdate = await accessorie.save()
        res.status(200).json({accessorieUpdate})
    } catch (error) {
        console.log(error)
    }
}

export {
    createAccessorie,
    readProductById,
    readAll,
    deleteProduct,
    updateAccessories
}