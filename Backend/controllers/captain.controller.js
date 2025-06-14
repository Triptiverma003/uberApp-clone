const CaptainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator'); 
const blackListTokenModel = require('../models/BlackListTokenModel');


module.exports.registerCaptain = async (req, res, next) => {
const errors = validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
}
//chatgpt code
const { fullname, email, password, vehicle } = req.body;
const { firstname, lastname } = fullname || {};
const { color, plate, capacity, vehicleType } = vehicle || {};
console.log({ firstname, lastname, email, password, color, plate, capacity, vehicleType });

//const { fullname, email, password, vehicle } = req.body;

const isCaptainExist = await CaptainModel.findOne({email});

if(isCaptainExist){
    return res.status(400).json({message: 'Captain already exists'});
}
const hashedPassword = await CaptainModel.hashedPassword(password);

const captain = await captainService.createCaptain({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
    color,
    plate,
    capacity,
    vehicleType,

    });
    const token = captain.generateAuthToken();  
    res.status(201).json({token, captain});

}

module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {email, password} = req.body;
    const captain = await CaptainModel.findOne({email}).select('+password');

    if(!captain){
        return res.status(401).json({message: 'Invalid email or password'});
    }

    const isMatch = await captain.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({message: 'Invalid email or password'});
    }
    const token = captain.generateAuthToken();
    res.cookie('token', token);
    res.status(200).json({token, captain});
}

module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json(req.captain);
}

module.exports.logoutCaptain = async (req, res) => {

    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

    await blackListTokenModel.create({token: token});

    res.clearCookie('token');

    res.status(200).json({message: 'Logged out successfully'});
}