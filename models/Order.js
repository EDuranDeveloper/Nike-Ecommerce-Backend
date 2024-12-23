import { Schema, model } from 'mongoose';

const OrderItemSchema = new Schema({
    total: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        required: true,
    }
});


const OrderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'UserId',
        required: true,
    },
    deliveryAddressId: {
        type: Schema.Types.ObjectId,
        ref: 'DeliveryAddressId',
        required: true,
    },
    paymentMethodId: {
        type: Schema.Types.ObjectId,
        ref: 'PaymentMethodId',
        required: true,
    },
    items: [OrderItemSchema]
});

const Order = model('Order', OrderSchema, "Orders");

export default Order;