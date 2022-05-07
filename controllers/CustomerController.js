const CustomerModel = require('../models/CustomerModel');
const StoreCustomerModel = require('../models/store/StoreCustomerModel');
const apiResponse = require('../helpers/apiResponse');

exports.getCustomersWithLimit = async (req, res) => {
    try {
        let storeID = req.store._id;

        let doc = await StoreCustomerModel.aggregate([
            {
                $match: {
                    storeID: storeID.toString(),
                },
            },
            {
                $unwind: '$customers',
            },
            {
                $sort: {
                    'customers.code': -1,
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
                    customers: {
                        $push: '$customers',
                    },
                    _id: 1,
                },
            },
            {
                $project: {
                    customers: 1,
                    _id: 0,
                },
            },
        ]);
        let customers = [];
        if (doc.length > 0) {
            customers = doc[0].customers;
            customers = await CustomerModel.populate(customers, {
                path: 'customer',
                options: {
                    lean: true,
                },
            });

            customers = customers.map((customer) => {
                customer.customer.code = customer.code;
                customer.customer.key = customer.code;
                return customer.customer;
            });
        }

        return apiResponse.successResponseWithData(res, 'OK', customers);
    } catch (error) {
        console.log(error);
        return apiResponse.ErrorResponse(res, error);
    }
};

exports.create = async (req, res) => {
    try {
        let storeID = req.store._id;
        let customer = await CustomerModel.create(req.body);

        if (customer) {
            let updated = await StoreCustomerModel.findOneAndUpdate(
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

            updated.customers.push({
                customer: customer._id,
                code: updated.counter,
            });

            updated = await updated.save();

            if (updated) {
                return apiResponse.successResponse(res, 'Customer created !');
            }
        }
    } catch (error) {
        return apiResponse.ErrorResponse(res, error);
    }
};

exports.update = async (req, res) => {
    try {
        let customer = await CustomerModel.findByIdAndUpdate(
            req.body._id,
            req.body,
            {
                new: true,
            }
        ).lean();

        customer.code = req.body.code;

        return apiResponse.successResponseWithData(
            res,
            'Customer updated !',
            customer
        );
    } catch (error) {
        console.log(error);
        return apiResponse.ErrorResponse(res, error);
    }
};

exports.search = async (req, res) => {
    let name = req.query.name;
    let storeID = req.store._id;

    try {
        let storeCustomer = await StoreCustomerModel.findOne({
            storeID: storeID,
        }).lean();

        let customers = storeCustomer.customers;

        customers = await CustomerModel.populate(customers, {
            path: 'customer',
            options: {
                lean: true,
            },
        });

        customers = customers.filter((customer) => {
            name = name.toLowerCase();
            return customer.customer.name.toLowerCase().search(name) >= 0;
        });

        customers = customers.map((customer) => {
            customer.customer.code = customer.code;
            customer.customer.key = customer.code;
            return customer.customer;
        });

        return apiResponse.successResponseWithData(res, 'OK', customers);
    } catch (error) {
        console.log(error);
        return apiResponse.ErrorResponse(res, error);
    }
};
