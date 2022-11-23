import mongoose from "mongoose";

const conectarDB = async () => {
    try {
        const db = await mongoose.connect(
            process.env.MONGO_URI,
            {
                useUnifiedTopology: true, //habilita a mongoose a controlar la base de datos de mongo
                useNewUrlParser: true 
            }
        )
        const url = `${db.connection.host}:${db.connection.port}`
        console.log(`MongoDB conectado en : ${url}`)
    } catch (error) {
        console.log(`error: ${error}`)
        process.exit(1)
    }
}

export default conectarDB;