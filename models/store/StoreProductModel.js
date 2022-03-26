const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const StoreProductSchema = new mongoose.Schema(
    {
        storeID: { type: String },
        counter: {
            type: Number,
            default: 0,
        },
        products: [
            {
                code: { type: Number },
                product: { type: String, ref: 'Product' },
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model('StoreProduct', StoreProductSchema);
