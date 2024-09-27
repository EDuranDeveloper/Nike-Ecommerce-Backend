import express from 'express'
import authRouter from './routes/auth.js';
import { dbConnection } from './database/config.js';
import dotenv from 'dotenv';

//Iniciando app
const app = express()


//Investigar que hace
app.use(express.json())

//Ruta para el auth
app.use('/api/auth', authRouter)



//Init database
dbConnection()

//Dotenv
dotenv.config()



//Escuchando en el puerto 
app.listen(process.env.PORT, () => {
    console.log('Server ON');
})
