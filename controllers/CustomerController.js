const CustomerModel = require('../models/CustomerModel');
const apiResponse = require('../helpers/apiResponse');

exports.getCustomerWithLimit = async (req, res) => {
    try {
        let customers = await CustomerModel.find()
            .sort({ createdAt: -1 })
            .limit(req.body.limit)
            .skip(req.body.skip)
            .lean();
        return apiResponse.successResponseWithData(res, 'OK', customers);
    } catch (error) {
        return apiResponse.ErrorResponse(res, error);
    }
};

exports.create = async (req, res) => {
    try {
        let customer = await CustomerModel.create(req.body);
        return apiResponse.successResponseWithData(
            res,
            'Customer created !',
            customer
        );
    } catch (error) {
        return apiResponse.ErrorResponse(res, error);
    }
};
