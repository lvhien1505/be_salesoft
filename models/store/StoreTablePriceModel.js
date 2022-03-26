const mongoose = require('mongoose');

const StoreTablePriceSchema = new mongoose.Schema(
    {
        storeID: { type: String },
        tablePrices: [{ type: String, ref: 'TablePrice' }],
    },
    { timestamps: true }
);

module.exports = mongoose.model('StoreTablePrice', StoreTablePriceSchema);
