const mongoose = require('mongoose');

const StoreSupplierSchema = new mongoose.Schema(
    {
        storeID: { type: String },
        counter: {
            type: Number,
            default: 0,
        },
        suppliers: [
            {
                code: { type: Number },
                supplier: { type: String },
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model('StoreSupplier', StoreSupplierSchema);
