import { Schema, model } from 'mongoose';

const CartItemSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
    },
    principalImage: {
        type: String
    },
    color: {
        type: String
    },
    tag: {
        type: String,
    },
    hex: {
        type: String
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
});


const CartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [CartItemSchema]
});

const Cart = model('Cart', CartSchema, "Carts");

export default Cart;
