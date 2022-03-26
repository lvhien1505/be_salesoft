const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        brand: { type: String },
        category: { type: String, ref: 'Category', required: true },
        position: { type: String },
        inventory: { type: Number, default: 0 },
        weight: { type: Number, default: 0 },
        type: { type: String, default: 'product' },
        photos: { type: Array },
        attributes: [
            {
                name: { type: String },
                values: { type: Array },
            },
        ],
        units: {
            nameBase: {
                type: String,
            },
            units: [
                {
                    name: { type: String },
                    value: { type: Number },
                    price: { type: Number },
                },
            ],
        },
        lessEstimate: { type: Number, default: 0 },
        mostEstimate: { type: Number, default: 999999 },
        description: { type: String },
        notePattern: { type: String },
        costPrice: { type: Number, default: 0 },
        pricePurchaseLast: { type: Number, default: 0 },
        price: { type: Number, default: 0 },
        status: { type: String, default: 'active' },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);
