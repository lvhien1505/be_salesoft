const mongoose = require('mongoose');

const TablePriceSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        products: [
            {
                productID: { type: String },
                price: { type: Number },
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model('TablePrice', TablePriceSchema);
