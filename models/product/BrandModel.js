const mongoose = require('mongoose');

const BrandSchema = new mongoose.Schema(
    {
        name: { type: String, unique: true },
        products: [
            {
                type: String,
                ref: 'ProductModel',
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Brand', BrandSchema);