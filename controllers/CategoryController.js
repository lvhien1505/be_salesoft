const StoreCategoryModel = require('../models/store/StoreCategoryModel');
const CategoryModel = require('../models/product/CategoryModel');
const apiResponse = require('../helpers/apiResponse');

exports.getAll = async (req, res) => {
    try {
        let storeID = req.store._id;

        let doc = await StoreCategoryModel.findOne({
            storeID: storeID,
        }).populate({
            path: 'categories',
            options: {
                sort: {
                    createdAt: -1,
                },
                lean: true,
            },
        });

        return apiResponse.successResponseWithData(res, 'OK', doc.categories);
    } catch (error) {
        return apiResponse.ErrorResponse(res, error);
    }
};

exports.create = async (req, res) => {
    try {
        let storeID = req.store._id;
        let categoryCreated = await CategoryModel.create(req.body);

        let updated = await StoreCategoryModel.findOneAndUpdate(
            {
                storeID: storeID,
            },
            {
                $push: {
                    categories: categoryCreated._id,
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
        let updated = await CategoryModel.findByIdAndUpdate(
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
        let removed = await CategoryModel.findByIdAndRemove(req.body._id, {
            new: true,
        });

        if (removed) {
            await StoreCategoryModel.findOneAndUpdate(
                {
                    storeID: storeID,
                },
                {
                    $pull: {
                        categories: removed._id,
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
