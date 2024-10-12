import { Schema, model } from 'mongoose';

// Esquema para el Producto
const ProductSchema = new Schema({
    name: {
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
    imageUrl: {
        type: [String],
    },
});

const Product = model('Product', ProductSchema, "Products");

export default Product
