const SupplierModel = require('../models/SupplierModel');
const StoreSupplierModel = require('../models/store/StoreSupplierModel');
const apiResponse = require('../helpers/apiResponse');

exports.getSuppliersWithLimit = async (req, res) => {
    try {
        let storeID = req.store._id;

        let doc = await StoreSupplierModel.aggregate([
            {
                $match: {
                    storeID: storeID.toString(),
                },
            },
            {
                $unwind: '$suppliers',
            },
            {
                $sort: {
                    'suppliers.code': -1,
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
                    suppliers: {
                        $push: '$suppliers',
                    },
                    _id: 1,
                },
            },
            {
                $project: {
                    suppliers: 1,
                    _id: 0,
                },
            },
        ]);
        let suppliers = [];
        if (doc.length > 0) {
            suppliers = doc[0].suppliers;
            suppliers = await SupplierModel.populate(suppliers, {
                path: 'supplier',
                options: {
                    lean: true,
                },
            });

            suppliers = suppliers.map((supplier) => {
                supplier.supplier.code = supplier.code;
                supplier.supplier.key = supplier.code;
                return supplier.supplier;
            });
        }

        return apiResponse.successResponseWithData(res, 'OK', suppliers);
    } catch (error) {
        console.log(error);
        return apiResponse.ErrorResponse(res, error);
    }
};

exports.create = async (req, res) => {
    try {
        let storeID = req.store._id;
        let supplier = await SupplierModel.create(req.body);

        if (supplier) {
            let updated = await StoreSupplierModel.findOneAndUpdate(
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

            updated.suppliers.push({
                supplier: supplier._id,
                code: updated.counter,
            });

            updated = await updated.save();

            if (updated) {
                return apiResponse.successResponse(res, 'Supplier created !');
            }
        }
    } catch (error) {
        return apiResponse.ErrorResponse(res, error);
    }
};

exports.update = async (req, res) => {
    try {
        let supplier = await SupplierModel.findByIdAndUpdate(
            req.body._id,
            req.body,
            {
                new: true,
            }
        ).lean();

        supplier.code = req.body.code;

        return apiResponse.successResponseWithData(
            res,
            'Supplier updated !',
            supplier
        );
    } catch (error) {
        console.log(error)
        return apiResponse.ErrorResponse(res, error);
    }
};

// exports.search = async (req, res) => {
//     let name = req.query.name;

//     try {
//         let customers = await CustomerModel.find({
//             $text: {
//                 $search: name,
//             },
//         }).lean();

//         return apiResponse.successResponseWithData(res, 'OK', customers);
//     } catch (error) {
//         console.log(error);
//         return apiResponse.ErrorResponse(res, error);
//     }
// };
