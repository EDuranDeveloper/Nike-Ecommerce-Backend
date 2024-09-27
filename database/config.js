import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const dbConnection = async() => {
    try {
        
        await mongoose.connect( process.env.DB_CNN )

        console.log('DB ONLINE');


    } catch (error) {
        console.log(error);
        throw new Error('Not ONLINE DataBase')
    }
}

export {
    dbConnection
}