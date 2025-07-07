const rideService = require('../services/ride.services');
const { validationResult } = require('express-validator');
const mapService = require('../services/maps.service.js');
const { sendMessageToSocketId } = require('../socket.js');
const rideModel = require('../models/rides.model');

module.exports.createRide = async (req, res) => {
    console.log("Received Request Body:", req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {user, pickup, destination, vehicleType } = req.body;

    try {
        // Get coordinates first
        const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
        console.log(pickupCoordinates);

        // Create ride before using it
        const ride = await rideService.createRide({user: req.user._id, pickup, destination, vehicleType,
        });

        console.log( "the vehicle type is" , vehicleType);

        // Find captains after ride creation
        const captainInRadius = await mapService.getTheCaptainInRadius(
            pickupCoordinates.lng,
            pickupCoordinates.lat,
            5000
        );
        console.log("🚀 Captains found in radius:", captainInRadius);

        const rideWithUser = await rideModel.findOne({_id: ride._id }).populate('user');

        // Notify captains with the created ride
            ride.otp = ""
            captainInRadius.map(captain => {
            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser
            });
        });

        console.log(`captain found: ${captainInRadius}`)

        return res.status(201).json({ ride, captainInRadius });

    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: err.message });
    }
};

module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination } = req.query;

    try {
        const fare = await rideService.getFare(pickup, destination);
        return res.status(200).json(fare);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.confirmRide({ rideId, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {

        console.log(err);
        return res.status(500).json({ message: err.message });
    }
}

module.exports.startRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query;

    try {
        const ride = await rideService.startRide({ rideId, otp, captain: req.captain });

        console.log(ride);

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}
module.exports.endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.endRide({ rideId, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        })



        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    } 
}


