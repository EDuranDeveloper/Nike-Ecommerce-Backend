import { Schema, model } from 'mongoose';

const FavoriteItemSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
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
    tag: {
        type: String,
    },
    principalImage: { 
        type: String, 
        required: true, 
    },
}, { versionKey: false }); 

const FavoriteSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [FavoriteItemSchema]
});

const Favorite = model('Favorite', FavoriteSchema, "Favorites");

export default Favorite;
