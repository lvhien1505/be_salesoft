const SupplierModel = require('../models/SupplierModel');
const apiResponse = require('../helpers/apiResponse');

exports.getSuppliersWithLimit = async (req, res) => {
    try {
        let suppliers = await SupplierModel.find()
            .sort({ createdAt: -1 })
            .limit(req.body.limit)
            .skip(req.body.skip)
            .lean();
        return apiResponse.successResponseWithData(res, 'OK', suppliers);
    } catch (error) {
        return apiResponse.ErrorResponse(res, error);
    }
};

exports.create = async (req, res) => {
    try {
        let supplier = await SupplierModel.create(req.body);
        return apiResponse.successResponseWithData(
            res,
            'Supplier created !',
            supplier
        );
    } catch (error) {
        return apiResponse.ErrorResponse(res, error);
    }
};
