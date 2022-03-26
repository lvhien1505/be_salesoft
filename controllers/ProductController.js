const fs = require('fs');
const ProductModel = require('../models/product/ProductModel');
const StoreProductModel = require('../models/store/StoreProductModel');
const apiResponse = require('../helpers/apiResponse');

exports.getProductsWithLimit = async (req, res) => {
    try {
        let storeID = req.store._id;

        let doc = await StoreProductModel.aggregate([
            {
                $match: {
                    storeID: storeID.toString(),
                },
            },
            {
                $unwind: '$products',
            },
            {
                $sort: {
                    'products.code': -1,
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
                    products: {
                        $push: '$products',
                    },
                    _id: 1,
                },
            },
            {
                $project: {
                    products: 1,
                    _id: 0,
                },
            },
        ]);
        let products = [];
        if (doc.length > 0) {
            products = doc[0].products;
            products = await ProductModel.populate(products, {
                path: 'product',
                options: {
                    lean: true,
                },
                populate: {
                    path: 'category',
                    select: 'name',
                    options: {
                        lean: true,
                    },
                },
            });

            products = products.map((product) => {
                product.product.photos =
                    product.product.photos.length > 0
                        ? product.product.photos.map(
                              (photo) =>
                                  req.user._id +
                                  '/' +
                                  product.code +
                                  '/' +
                                  photo
                          )
                        : [];
                product.product.code = product.code;
                product.product.key = product.code;
                return product.product;
            });
        }

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
            let storeID = req.store._id;

            let updated = await StoreProductModel.findOneAndUpdate(
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

            updated.products.push({
                product: product._id,
                code: updated.counter,
            });

            updated = await updated.save();

            if (updated) {
                if (req.files && req.files.length > 0) {
                    const oldPath = 'uploads/' + req.user._id + '/files';

                    const newPath =
                        'uploads/' + req.user._id + '/' + updated.counter;

                    fs.rename(oldPath, newPath, function (err) {
                        if (err) throw err;

                        const dir = 'uploads/' + req.user._id + '/files';
                        if (!fs.existsSync(dir)) {
                            fs.mkdirSync(dir, { recursive: true });
                        }
                    });
                }
            }

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

exports.update = async (req, res) => {
    try {
        let code = req.body.code;

        let updated = await ProductModel.findByIdAndUpdate(
            req.body._id,
            req.body,
            {
                new: true,
            }
        )
            .populate({
                path: 'category',
                select: 'name',
                options: {
                    lean: true,
                },
            })
            .lean();

        if (updated) {
            updated.photos = updated.photos.map(
                (photo) => req.user._id + '/' + code + '/' + photo
            );

            updated.code = code;

            return apiResponse.successResponseWithData(
                res,
                'Product updated !',
                updated
            );
        }
    } catch (error) {
        console.log(error);
        return apiResponse.ErrorResponse(res, error);
    }
};
