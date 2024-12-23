import dotenv from 'dotenv';
import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.js';
import cartRouter from './routes/cart.js';
import productsRouter from './routes/products.js';
import favoritesRouter from './routes/favorites.js';
import ordersRouter from './routes/orders.js';
import { dbConnection } from './database/config.js';

//Iniciando app
const app = express()


app.use(cors())


//Investigar que hace
app.use(express.json())

//Ruta para el auth
app.use('/api/auth', authRouter)

//Ruta para carrita
app.use('/api/cart', cartRouter)


//Ruta para productos
app.use('/api/products', productsRouter)

//Ruta para favoritos
app.use('/api/favorites', favoritesRouter)

app.use('/api/orders', ordersRouter)



//Init database
dbConnection()

//Dotenv
dotenv.config()



//Escuchando en el puerto 
app.listen(process.env.PORT, () => {
    console.log(`Server ON in port ${ process.env.PORT }`);
})
