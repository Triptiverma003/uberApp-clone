const captainController = require('../controllers/captain.controller');
const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware');
router.post('/register',[
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name is required'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({min:3}).withMessage('Color should be atleast 3 characters long'),
    body('vehicle.plate').isLength({min:3}).withMessage('Plate should be atleast 3 characters long'),
    body('vehicle.capacity').isLength({min:1}).withMessage('Capacity should be atleast 1 characters long'),
],
    captainController.registerCaptain
);
router.post('/login', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long')
],
    captainController.loginCaptain,
)
router.get('/profile',authMiddleware.authCaptain,captainController.getCaptainProfile);

router.get('/logout',authMiddleware.authCaptain,captainController.logoutCaptain);
module.exports = router;