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

export {
    createAccessorie
}