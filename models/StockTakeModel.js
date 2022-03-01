const mongoose = require('mongoose');

const StockTakeSchema = new mongoose.Schema(
    {
        id: { type: Number, required: true, unique: true },
        code: { type: String, required: true, unique: true },
        dateStockTakes: { type: Date },
        numReal: { type: Number },
        totalReal: { type: Number },
        totalDiff: { type: Number },
        totalValueDiff: { type: Number },
        numIncr: { type: Number },
        totalValueIncr: { type: Number },
        numDesc: { type: Number },
        totalValueDesc: { type: Number },
        note: { type: String },
        status: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model('StockTake', StockTakeSchema);
