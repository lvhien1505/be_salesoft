const _ = require('lodash');
const StoreTablePriceModel = require('../models/store/StoreTablePriceModel');
const TablePriceModel = require('../models/TablePriceModel');
const apiResponse = require('../helpers/apiResponse');

exports.getAll = async (req, res) => {
    try {
        let storeID = req.store._id;

        let doc = await StoreTablePriceModel.findOne({
            storeID: storeID,
        }).populate({
            path: 'tablePrices',
            options: {
                sort: {
                    createdAt: -1,
                },
                lean: true,
            },
        });

        return apiResponse.successResponseWithData(res, 'OK', doc.tablePrices);
    } catch (error) {
        return apiResponse.ErrorResponse(res, error);
    }
};

exports.getWithID = async (req, res) => {
    try {
        let id = req.body._id;

        let doc = await TablePriceModel.findById(id).populate({
            path: 'products.productID',
            options: {
                lean: true,
            },
        });

        let products = doc.products.map((product) => {
            product.productID.price = product.price;
            return product;
        });

        return apiResponse.successResponseWithData(res, 'OK', products);
    } catch (error) {
        return apiResponse.ErrorResponse(res, error);
    }
};

exports.create = async (req, res) => {
    try {
        let storeID = req.store._id;
        let tablePriceCreated = await TablePriceModel.create(req.body);

        let updated = await StoreTablePriceModel.findOneAndUpdate(
            {
                storeID: storeID,
            },
            {
                $push: {
                    tablePrices: tablePriceCreated._id,
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
        let updated = await TablePriceModel.findByIdAndUpdate(
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

exports.pushPrice = async (req, res) => {
    try {
        let updated = await TablePriceModel.findByIdAndUpdate(
            req.body._id,
            {
                $push: {
                    products: {
                        price: req.body.price,
                        productID: req.body.productID,
                    },
                },
            },
            {
                new: true,
            }
        );

        if (updated) {
            return apiResponse.successResponseWithData(
                res,
                'Doc updated !',
                updated
            );
        }
    } catch (error) {
        return apiResponse.ErrorResponse(res, error);
    }
};

exports.updatePrice = async (req, res) => {
    try {
        let tablePrice = await TablePriceModel.findById(req.body._id);

        var index = _.findIndex(tablePrice.products, {
            productID: req.body.productID,
        });

        tablePrice.products[index].price = req.body.price;

        let updated = await tablePrice.save();

        if (updated) {
            return apiResponse.successResponseWithData(
                res,
                'Doc updated !',
                updated
            );
        }
    } catch (error) {
        console.log(error);
        return apiResponse.ErrorResponse(res, error);
    }
};

exports.remove = async (req, res) => {
    try {
        let storeID = req.store._id;
        let removed = await TablePriceModel.findByIdAndRemove(req.body._id, {
            new: true,
        });

        if (removed) {
            await StoreTablePriceModel.findOneAndUpdate(
                {
                    storeID: storeID,
                },
                {
                    $pull: {
                        tablePrices: removed._id,
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
