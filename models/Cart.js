import { Schema, model } from 'mongoose';

// Esquema para un ítem del carrito
const CartItemSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId, 
        ref: 'Product',  // Referencia al modelo de Producto
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
});

// Esquema para el carrito de compras
const CartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User',  // Referencia al modelo de Usuario
        required: true
    },
    items: [CartItemSchema],  // Una lista de ítems
    totalPrice: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});


const Cart = model('Cart', CartSchema);
export default Cart;
