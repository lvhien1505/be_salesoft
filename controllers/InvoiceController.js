const InvoiceModel = require('../models/InvoiceModel');
const apiResponse = require('../helpers/apiResponse');

exports.getInvoicesWithLimit = async (req, res) => {
    try {
        let invoices = await InvoiceModel.find()
            .populate({
                path: 'customer',
                match: {
                    hasCustomer:true
                },
            })
            .sort({ createdAt: -1 })
            .limit(req.body.limit)
            .skip(req.body.skip)
            .lean();
        return apiResponse.successResponseWithData(res, 'OK', invoices);
    } catch (error) {
        return apiResponse.ErrorResponse(res, error);
    }
};

exports.create = async (req, res) => {
    try {
        let invoice = await InvoiceModel.create(req.body);
        return apiResponse.successResponseWithData(
            res,
            'invoice created !',
            invoice
        );
    } catch (error) {
        return apiResponse.ErrorResponse(res, error);
    }
};

exports.update = async (req, res) => {
    try {
        let invoice = await InvoiceModel.findByIdAndUpdate(
            req.body.id,
            req.body,
            {
                new: true,
            }
        );

        return apiResponse.successResponseWithData(
            res,
            'invoice updated !',
            invoice
        );
    } catch (error) {
        return apiResponse.ErrorResponse(res, error);
    }
};
