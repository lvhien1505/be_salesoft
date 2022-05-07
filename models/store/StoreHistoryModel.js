const mongoose = require('mongoose');

const StoreHistorySchema = new mongoose.Schema(
    {
        storeID:{type:String},
        counter: {
            type: Number,
            default: 0,
        },
        histories: [
            {
                code: { type: Number },
                history: { type: String },
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model('StoreHistory', StoreHistorySchema);
