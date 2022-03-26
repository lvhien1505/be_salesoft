const StoreBrandModel = require('../models/store/StoreBrandModel');
const BrandModel = require('../models/product/BrandModel');
const apiResponse = require('../helpers/apiResponse');

exports.getAll = async (req, res) => {
    try {
        let storeID = req.store._id;

        let doc = await StoreBrandModel.findOne({
            storeID: storeID,
        }).populate({
            path: 'brands',
            options: {
                sort: {
                    createdAt: -1,
                },
                lean: true,
            },
        });

        return apiResponse.successResponseWithData(res, 'OK', doc.brands);
    } catch (error) {
        return apiResponse.ErrorResponse(res, error);
    }
};

exports.create = async (req, res) => {
    try {
        let storeID = req.store._id;
        let brandCreated = await BrandModel.create(req.body);

        let updated = await StoreBrandModel.findOneAndUpdate(
            {
                storeID: storeID,
            },
            {
                $push: {
                    brands: brandCreated._id,
                },
            },
            {
                new: true,
            }
        );

        if (updated) {
            return apiResponse.successResponse(res, 'Doc created !');
        }
    } catch (error) {
        return apiResponse.ErrorResponse(res, error);
    }
};

exports.update = async (req, res) => {
    try {
        let updated = await BrandModel.findByIdAndUpdate(
            req.body._id,
            req.body,
            {
                new: true,
            }
        );

        if (updated) {
            return apiResponse.successResponse(res, 'Doc updated !');
        }
    } catch (error) {
        return apiResponse.ErrorResponse(res, error);
    }
};

exports.remove = async (req, res) => {
    try {
        let storeID = req.store._id;
        let removed = await BrandModel.findByIdAndRemove(req.body._id, {
            new: true,
        });

        if (removed) {
            await StoreBrandModel.findOneAndUpdate(
                {
                    storeID: storeID,
                },
                {
                    $pull: {
                        brands: removed._id,
                    },
                },
                {
                    new: true,
                }
            );
            return apiResponse.successResponse(res, 'Doc removed !');
        }
    } catch (error) {
        return apiResponse.ErrorResponse(res, error);
    }
};
