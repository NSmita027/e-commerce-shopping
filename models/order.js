const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user : {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true,},


    orderItems : [
        {
            product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required:true },
            quantity: {type: Number, required: true, min: 1},
        },
    ],


    shippingAddress : {
        fullName : {type: String, required: true},
        address: {type: String, required: true},
        city : {type: String, required: true},
        postalCode : {type: String, required: true},
        country: {type: String, required: true}
    },

    paymentMethod:{type: String, enum: ['COD', 'card', 'upi'], default: 'COD'},

    //New payment fields

    isPaid: {type: Boolean, default: false},
    paidAt: {type: Date}, 
    paymentResult : {
        id: {type: String},                 // gateway transaction id
        status : {type: String},            // 'success' / 'failed' etc
        update_time : {type: String},
        email_address : {type: String},
    },

    totalPrice: {type: Number, required: true},

    status: {type: String, enum: ['pending', 'processing', 'paid', 'shipped', 'delivered', 'cancelled'], default: 'pending'},
},

{timestamps : true}
);

module.exports = mongoose.model('Order', orderSchema);