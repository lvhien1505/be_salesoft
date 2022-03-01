const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema(
    {
        products: { type: Array },
        tablePrice: { type: Array },
        customers: { type: Array },
        suppliers: { type: Array },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Store', StoreSchema);
