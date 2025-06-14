const express = require('express');
const router = express.Router();
const mapController = require('../controllers/maps.controller');
const { getCoordinates } = mapController;
const authMiddleware = require('../middlewares/auth.middleware');
const {query} =  require('express-validator')

router.get('/get-coordinates',
    query('address').isString().isLength({min: 3}), 
    authMiddleware.authUser , getCoordinates
);

router.get('/get-distance-time', 
    query('origin').isString().isLength({min: 3}),
    query('destination').isString().isLength({min: 3}),
    authMiddleware.authUser,
    mapController.getDistanceTime
)

router.get('/get-suggestion' , 
    query('input').isString().isLength({min: 3}),
    authMiddleware.authUser,
    mapController.getAutoCompleteSuggestion
)

module.exports = router;