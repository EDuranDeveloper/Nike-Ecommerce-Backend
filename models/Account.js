import { Schema, model } from 'mongoose';

const AccountItemsSchema = new Schema({
    birthdate: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    zip: {
        type: String,
        required: true,
    }
});


const AccountSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'UserId',
        required: true,
    },    
    items: [AccountItemsSchema]
});

const Account = model('Account', AccountSchema, "Accounts");

export default Account;