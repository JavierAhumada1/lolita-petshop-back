import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import cors from 'cors'

const app = express()
dotenv.config()
connectDB()

const dominiosPermitidos = [process.env.FRONTEND_URL]
const corsOptiones = {
    origin: function(origin, callback) {
        if(dominiosPermitidos.indexOf(origin) !== -1){
            //el origuen del request esta permitido
            callback(null, true)
        }else {
            callback(new Error('No permitido por CORS'))
        }
    }
}

app.use(cors(corsOptiones))
// app.use('/api/user', )

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puero ${PORT}`)
})