const express = require('express');
const AuthController = require('../controllers/AuthController');
const {
    validationResult,
    validatorLogin,
    validatorRegister,
} = require('../middlewares/validator');
const authenticate = require('../middlewares/jwt');

const router = express.Router();

router.post('/', authenticate, AuthController.auth);
router.post(
    '/register',
    validatorRegister,
    validationResult,
    AuthController.register
);
router.post('/login', validatorLogin, validationResult, AuthController.login);
router.post('/send-confirm-otp', authenticate, AuthController.sendConfirmOTP);
router.post('/confirm-account', authenticate, AuthController.confirmAccount);

module.exports = router;
