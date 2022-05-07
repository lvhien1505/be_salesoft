const CashFlowModel = require('../models/CashFlowModel');
const StoreCashFlowModel = require('../models/store/StoreCashFlowModel');
const CustomerModel = require('../models/CustomerModel');
const SupplierModel = require('../models/SupplierModel');
const apiResponse = require('../helpers/apiResponse');

exports.getInvoicesWithLimit = async (req, res) => {
    try {
        let storeID = req.store._id;

        let doc = await StoreCashFlowModel.aggregate([
            {
                $match: {
                    storeID: storeID.toString(),
                },
            },
            {
                $unwind: '$cashflows',
            },
            {
                $sort: {
                    'cashflows.code': -1,
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
                    cashflows: {
                        $push: '$cashflows',
                    },
                    _id: 1,
                },
            },
            {
                $project: {
                    cashflows: 1,
                    _id: 0,
                },
            },
        ]);

        let cashflows = [];
        if (doc.length > 0) {
            cashflows = doc[0].cashflows;
            cashflows = await CashFlowModel.populate(cashflows, {
                path: 'cashflow',
                options: {
                    lean: true,
                },
            });

            cashflows = cashflows.map((cashflow) => {
                cashflow.cashflow.code = cashflow.code;
                cashflow.cashflow.key = cashflow.code;
                return cashflow.cashflow;
            });
        }

        return apiResponse.successResponseWithData(res, 'OK', cashflows);
    } catch (error) {
        console.log(error);
        return apiResponse.ErrorResponse(res, error);
    }
};

exports.create = async (req, res) => {
    try {
        let storeID = req.store._id;

        if (req.body.typeTarget === 'customer') {
            let target = await CustomerModel.findById(req.body.idTarget).lean();
            delete target.debt;
            delete target.totalBuy;
            delete target.createdAt;
            delete target.updatedAt;
            delete target.__v;
            req.body.target = target;
            delete req.body.idTarget;
        }

        if (req.body.typeTarget === 'supplier') {
            let target = await SupplierModel.findById(req.body.idTarget);
        }

        let cashflow = await CashFlowModel.create(req.body);

        if (cashflow) {
            let updated = await StoreCashFlowModel.findOneAndUpdate(
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

            updated.cashflows.push({
                cashflow: cashflow._id,
                code: updated.counter,
            });

            updated = await updated.save();

            if (updated) {
                return apiResponse.successResponse(res, 'Cashflow created !');
            }
        }
    } catch (error) {
        console.log(error);
        return apiResponse.ErrorResponse(res, error);
    }
};

exports.update = async (req, res) => {
    try {
        let cashflow = await CashFlowModel.findByIdAndUpdate(
            req.body.id,
            req.body,
            {
                new: true,
            }
        );

        return apiResponse.successResponseWithData(
            res,
            'cashflow updated !',
            cashflow
        );
    } catch (error) {
        return apiResponse.ErrorResponse(res, error);
    }
};
