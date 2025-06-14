const userModel = require('../models/user.models')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blackListTokenModel = require("../models/BlackListTokenModel")
const CaptainModel = require('../models/captain.model');

module.exports.authUser = async (req, res , next) => {
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

    console.log('Cookies:', req.cookies); // Debugging logs
    console.log('Authorization Header:', req.headers.authorization);
    console.log('Extracted Token:', token);

    if(!token){
        console.log('No token provided');
        return res.status(401).json({message: 'Unauthorized'});
    }
    const isBlackListed = await blackListTokenModel.findOne({token: token});
    console.log('Is Token Blacklisted:', isBlackListed);

    if(isBlackListed){
        return res.status(401).json({message: 'Unauthorized'});
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        req.user = user;

        return next();
    }catch(err){ 
        return res.status(401).json({message: 'Unauthorized'});   
    }
};
module.exports.authCaptain = async(req, res, next) => {
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

    console.log("Token from cookies:", req.cookies?.token);
    console.log("Token from headers:", req.headers.authorization);
    console.log("Extracted token:", token);


    if(!token){
        return res.status(401).json({message: 'Unauthorized'});
    }
    const isBlackListed = await blackListTokenModel.findOne({token: token});

    console.log(isBlackListed);

    if(isBlackListed){
        return res.status(401).json({message: 'Unauthorized'});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await CaptainModel.findById(decoded._id);
        req.captain = captain;
        return next();
    }catch(err){
        console.log(err);
        return res.status(401).json({message: 'Unauthorized'});
    }
}