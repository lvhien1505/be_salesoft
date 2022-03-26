const mongoose = require('mongoose');

const StoreBrandSchema = new mongoose.Schema(
    {
        storeID: { type: String },
        brands: [{ type: String, ref: 'Brand' }],
    },
    { timestamps: true }
);

module.exports = mongoose.model('StoreBrand', StoreBrandSchema);
