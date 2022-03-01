const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema(
    {
        id: { type: Number, required: true, unique: true },
        code: { type: String, required: true, unique: true },
        dateSell: { type: Date },
        dateUpdated: { type: Date },
        codeReturns: { type: String },
        codeCustomer:{type:String},
        nameCustomer: { type: String },
        phoneCustomer: { type: String },
        addressCustomer: { type: String },
        districtCustomer: { type: String },
        subDistrictCustomer: { type: String },
        birthday: { type: Date },
        totalPrice: { type: Number },
        saleOff: { type: Number },
        totalPayment: { type: Number },
        totalPaid: { type: Number },
        note: { type: String },
        status: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Invoice', InvoiceSchema);