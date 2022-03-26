const mongoose = require('mongoose');

const StoreCustomerSchema = new mongoose.Schema(
    {
        storeID:{type:String},
        counter: {
            type: Number,
            default: 0,
        },
        customers: [
            {
                code: { type: Number },
                customer: { type: String },
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model('StoreCustomer', StoreCustomerSchema);
