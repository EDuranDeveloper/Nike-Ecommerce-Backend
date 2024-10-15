import { Schema, model } from 'mongoose';

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    model: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    discount: {
        type: Number,
        required: true,
        min: 0
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    tag: {
        type: String,
    },
    principalImage: { 
        type: String, 
        required: true, 
    },
    secondaryImages: { 
        type: [String], 
    },
    color: { 
     type: String,   
    },
    hex: {
     type: String,
    }
}, { versionKey: false }); 

const Product = model('Product', ProductSchema, "Products");

export default Product;
