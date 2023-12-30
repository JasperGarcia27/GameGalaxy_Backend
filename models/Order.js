const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    products: [{
        productId: {
            type: String
        },
        image: String,
        productName: {
            type: String
        },
        quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity cannot be less than 1'],
            default: 1
        },
        price: {
            type: Number,
            required: true
        }
    }],
    bill: {
        type: Number,
        required: true
    },
    purchasedOn: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('Order', orderSchema);