const fs = require('fs');
const ProductModel = require('../models/product/ProductModel');
const apiResponse = require('../helpers/apiResponse');

exports.getProductsWithLimit = async (req, res) => {
    try {
        let products = await ProductModel.find()
            .limit(req.body.limit)
            .skip(req.body.skip)
            .populate({
                path: 'category',
                select: 'name',
            })
            .sort({ createdAt: -1 })
            .lean();

        return apiResponse.successResponseWithData(res, 'OK', products);
    } catch (error) {
        console.log(error);
        return apiResponse.ErrorResponse(res, error);
    }
};

exports.getProductWithCode = async (req, res) => {
    try {
        let product = await ProductModel.findById(req.body.code).lean();
        if (product) {
            return apiResponse.successResponseWithData(res, 'OK', product);
        }
        return apiResponse.notFoundResponse(res, 'Not fount product');
    } catch (error) {
        return apiResponse.ErrorResponse(res, error);
    }
};

exports.create = async (req, res) => {
    try {
        req.body = JSON.parse(JSON.stringify(req.body));

        for (const key in req.body) {
            if (Object.hasOwnProperty.call(req.body, key)) {
                const element = req.body[key];

                if (element === 'undefined') {
                    req.body[key] = undefined;
                }

                if (element === 'null') {
                    req.body[key] = null;
                }
            }
        }
        if (req.files && req.files.length > 0) {
            req.body.photos = req.files.map((file) => file.filename);
        }

        if (req.body.attributes) {
            req.body.attributes = JSON.parse(req.body.attributes);
        }

        if (req.body.units) {
            req.body.units = JSON.parse(req.body.units);
        }

        let product = await ProductModel.create(req.body);

        if (product) {
            const oldPath =
                'uploads/' + req.user._id + '/images/products/files';
            const newPath =
                'uploads/' + req.user._id + '/images/products/' + product._id;

            fs.rename(oldPath, newPath, function (err) {
                if (err) throw err;

                const dir =
                    'uploads/' + req.user._id + '/images/products/files';
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true });
                }
            });

            return apiResponse.successResponseWithData(
                res,
                'Product created !',
                product
            );
        }
    } catch (error) {
        console.log(error);
        return apiResponse.ErrorResponse(res, error);
    }
};
