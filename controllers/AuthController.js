const bcrypt = require('bcrypt');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');
const StoreModel = require('../models/StoreModel');
const StoreProductModel = require('../models/store/StoreProductModel');
const StoreCustomerModel = require('../models/store/StoreCustomerModel');
const StoreSupplierModel = require('../models/store/StoreSupplierModel');
const StoreCategoryModel = require('../models/store/StoreCategoryModel');
const StoreBrandModel = require('../models/store/StoreBrandModel');
const StoreInvoiceModel = require('../models/store/StoreInvoiceModel');
const StoreTablePriceModel = require('../models/store/StoreTablePriceModel');
const StoreCashFlowModel = require('../models/store/StoreCashFlowModel');
const StoreHistoryModel = require('../models/store/StoreHistoryModel');
const apiResponse = require('../helpers/apiResponse');
const utility = require('../helpers/ultility');
const mailer = require('../helpers/mailer');
const { constants } = require('../helpers/constants');

exports.register = async (req, res) => {
    try {
        const foundUser = await UserModel.findOne({
            email: req.body.email,
        }).lean();

        if (foundUser) {
            return apiResponse.conflicResponse(res, 'Email is exist');
        }

        //hash input password
        const hash = await bcrypt.hash(req.body.password, 10);
        if (hash) {
            // Create User object with escaped and trimmed data
            const user = await UserModel.create({
                fullName: req.body.fullName,
                phone: req.body.phone,
                email: req.body.email,
                password: hash,
            });

            if (user) {
                const dir = 'uploads/' + user._id + '/images/products/files';
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true });
                }

                return apiResponse.successResponseWithData(
                    res,
                    'Registration Success.',
                    user
                );
            }
        }
    } catch (error) {
        //throw error in json response with status 500.
        return apiResponse.ErrorResponse(res, error);
    }
};

exports.login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email }).lean();

        if (user) {
            const compare = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (compare) {
                let userData = {
                    _id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                };
                //Prepare JWT token for authentication
                const jwtPayload = userData;
                const jwtData = {
                    expiresIn: process.env.JWT_TIMEOUT_DURATION,
                };
                const secret = process.env.JWT_SECRET;
                //Generated JWT token with Payload and secret.
                userData.token = jwt.sign(jwtPayload, secret, jwtData);
                return apiResponse.successResponseWithData(
                    res,
                    'Login Success.',
                    userData
                );
            } else {
                return apiResponse.unauthorizedResponse(
                    res,
                    'Email or Password wrong.'
                );
            }
        } else {
            return apiResponse.unauthorizedResponse(
                res,
                'Email or Password wrong.'
            );
        }
    } catch (error) {
        //throw error in json response with status 500.
        return apiResponse.ErrorResponse(res, error);
    }
};

exports.auth = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.user.email }).lean();

        delete req.user.iat;
        delete req.user.exp;
        if (!user.isConfirmed) {
            return apiResponse.unauthorizedResponse(
                res,
                'Account is not confirmed. Please confirm your account.',
                'notConfirm',
                req.user
            );
        }
        if (!user.status) {
            return apiResponse.unauthorizedResponse(
                res,
                'Account is not active. Please contact admin.',
                'notActive',
                req.user
            );
        }
        return apiResponse.successResponseWithData(
            res,
            'Authenticate success.',
            req.user
        );
    } catch (error) {
        //throw error in json response with status 500.
        return apiResponse.ErrorResponse(res, error);
    }
};

exports.sendConfirmOTP = async (req, res) => {
    try {
        if (req.user.email === req.body.email) {
            let user = await UserModel.findById(req.user._id);
        
            if (!user.isConfirmed) {
                let otp = utility.randomNumber(4);

                user.confirmOTP = otp;
                let userUpdated = await user.save();
                if (userUpdated) {
                    let html =
                        '<p>Mã xác thực.</p><p>OTP: ' +
                        user.confirmOTP +
                        '</p>';
                    mailer
                        .send(
                            constants.confirmEmails.from,
                            req.body.email,
                            'Confirm Account',
                            html
                        )
                        .then(function () {
                            return apiResponse.successResponse(
                                res,
                                'Confirm otp sent.'
                            );
                        });
                }
            } else {
                return apiResponse.successResponse(res, 'success');
            }
        }
    } catch (error) {
        //throw error in json response with status 500.
        console.log(error)
        return apiResponse.ErrorResponse(res, error);
    }
};

exports.confirmAccount = async (req, res) => {
    try {
        if (req.user.email === req.body.email) {
            let user = await UserModel.findById(req.user._id);

            if (!user.isConfirmed) {
                let otp = parseInt(req.body.otp);
                if (user.confirmOTP === otp) {
                    user.isConfirmed = true;
                    let userUpdated = await user.save();

                    if (userUpdated) {
                        let store = await StoreModel.create({
                            userID: user._id,
                        });
                        await StoreProductModel.create({
                            storeID: store._id,
                        });
                        await StoreSupplierModel.create({
                            storeID: store._id,
                        });
                        await StoreCustomerModel.create({
                            storeID: store._id,
                        });
                        await StoreBrandModel.create({
                            storeID: store._id,
                        });
                        await StoreCategoryModel.create({
                            storeID: store._id,
                        });
                        await StoreInvoiceModel.create({
                            storeID: store._id,
                        });
                        await StoreTablePriceModel.create({
                            storeID: store._id,
                        });
                        await StoreCashFlowModel.create({
                            storeID: store._id,
                        });
                        await StoreHistoryModel.create({
                            storeID: store._id,
                        });

                        return apiResponse.successResponse(
                            res,
                            'Confirm success'
                        );
                    }
                }
            } else {
                return apiResponse.successResponse(res, 'success');
            }
        }
    } catch (error) {
        //throw error in json response with status 500.
        console.log(error);
        return apiResponse.ErrorResponse(res, error);
    }
};
