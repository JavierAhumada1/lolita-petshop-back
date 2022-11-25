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

export {
    createAccessorie,
    readProductById,
    readAll
}