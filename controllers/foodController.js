import Food from "../models/foodModel.js";

const createProduct = async(req, res) => {
    const dataFood = req.body
    try {
        const food = await Food(dataFood)
        await food.save()
        res.status(200).json({msg: 'Producto creado', food})
    } catch (error) {
        console.log(error)
    }
}

const readProductById = async(req, res) => {
    const { id } = req.params
    const food = await Food.findById(id)
    if(!food){
        const error = new Error('No se encontro ese producto')
        return res.status(400).json({msg: error.message})
    }
    res.status(200).json({food})
}

const readAll = async(req, res) => {
    const food = await Food.find()
    res.status(200).json({food})
    
}

const deleteProduct = async(req, res) => {
    const {id} = req.params
    const food = await Food.findById(id)
    if(!food){
        const error = new Error('Hubo un error')
        return res.status(400).json({msg: error.message})
    }
    try {
        await food.deleteOne()
        res.status(200).json({msg: 'Producto eliminado'})
    } catch (error) {
        console.log(error)
    }
}

const updateProduct = async(req, res) => {
    const {id} = req.params
    const food = await Food.findById(id)
    if(!food){
        const error = new Error('Producto no encontroado')
        return res.status(400).json({msg: error.message})
    }

    food.type = req.body.type || food.type
    food.weight = req.body.weight || food.weight
    food.name = req.body.name || food.name
    food.age = req.body.age || food.age
    food.brand = req.body.brand || food.brand
    food.date = req.body.date || food.date
    food.stock = req.body.stock || food.stock
    food.price = req.body.price || food.price
    try {
        const foodUpdate = await food.save()
        res.status(200).json({foodUpdate})
    } catch (error) {
        console.log(error)
    }
}


export {
    createProduct,
    readProductById,
    readAll,
    deleteProduct,
    updateProduct
}