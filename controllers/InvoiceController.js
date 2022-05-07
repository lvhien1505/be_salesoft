const InvoiceModel = require('../models/InvoiceModel');
const StoreInvoiceModel = require('../models/store/StoreInvoiceModel');
const apiResponse = require('../helpers/apiResponse');

exports.getInvoicesWithLimit = async (req, res) => {
    try {
        let storeID = req.store._id;

        let doc = await StoreInvoiceModel.aggregate([
            {
                $match: {
                    storeID: storeID.toString(),
                },
            },
            {
                $unwind: '$invoices',
            },
            {
                $sort: {
                    'invoices.code': -1,
                },
            },
            {
                $skip: req.body.skip,
            },
            {
                $limit: req.body.limit,
            },
            {
                $group: {
                    invoices: {
                        $push: '$invoices',
                    },
                    _id: 1,
                },
            },
            {
                $project: {
                    invoices: 1,
                    _id: 0,
                },
            },
        ]);

        let invoices = [];
        if (doc.length > 0) {
            invoices = doc[0].invoices;
            invoices = await InvoiceModel.populate(invoices, {
                path: 'invoice',
                options: {
                    lean: true,
                },
                populate:{
                    path:'customer',
                    options: {
                        lean: true,
                    },
                }
            });

            invoices = invoices.map((invoice) => {
                invoice.invoice.code = invoice.code;
                invoice.invoice.key = invoice.code;
                return invoice.invoice;
            });
        }

        return apiResponse.successResponseWithData(res, 'OK', invoices);
    } catch (error) {
        console.log(error);
        return apiResponse.ErrorResponse(res, error);
    }
};

exports.create = async (req, res,next) => {
    try {
        let storeID = req.store._id;
        let invoice = await InvoiceModel.create(req.body);

        if (invoice) {
            let updated = await StoreInvoiceModel.findOneAndUpdate(
                {
                    storeID: storeID,
                },
                {
                    $inc: {
                        counter: 1,
                    },
                },
                {
                    new: true,
                }
            );

            updated.invoices.push({
                invoice: invoice._id,
                code: updated.counter,
            });

            updated = await updated.save();

            if (updated) {
                let idCustomer = req.body.customer
                req.body = {};
                req.body.type = 'in'
                req.body.methodPayment = 'money'
                req.body.datePayment = invoice.dateSell;
                req.body.typeTarget = 'customer'
                req.body.idTarget = idCustomer;
                req.body.price = invoice.totalPaid;
                next();
                // return apiResponse.successResponse(res, 'Invoice created !');
            }
        }
    } catch (error) {
        console.log(error)
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
