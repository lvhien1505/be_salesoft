const mongoose = require('mongoose');

const StoreCategorySchema = new mongoose.Schema(
    {
        storeID: { type: String },
        categories: [{ type: String,ref:'Category' }],
    },
    { timestamps: true }
);

module.exports = mongoose.model('StoreCategory', StoreCategorySchema);
