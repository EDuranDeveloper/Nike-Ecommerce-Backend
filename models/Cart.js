import { Schema, model } from 'mongoose';

const CartItemSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
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
