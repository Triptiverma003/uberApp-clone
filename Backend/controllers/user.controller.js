const userModel = require('../models/user.models');
const userService = require('../services/user.service');
const {validationResult} = require('express-validator');
const blackListTokenModel = require('../models/BlackListTokenModel');
module.exports.registerUser = async (req, res , next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {fullname , email, password} = req.body;


    const isUserExist = await userModel.findOne({email});
    if(isUserExist){
        return res.status(400).json({message: 'User already exists'});
    }

    
    const hashedPassword = await userModel.hashedPassword(password);

    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });
    const token = user.generateAuthToken();
    res.status(201).json({token , user});
};
module.exports.loginUser = async (req, res , next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;
    const user = await userModel.findOne({email}).select('+password');

    if(!user){
        return res.status(401).json({message: 'Invalid email or password'});
    }
    const isMatch = await user.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({message: 'Invalid email or password'});
    }

    const token = user.generateAuthToken();
    res.cookie('token' , token);
    res.status(200).json({token , user});
};
module.exports.getUserProfile = async (req, res, next) => {

    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: No user data" });
    }

    if (!req.user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(req.user);
};
module.exports.logoutUser = async (req, res) => {
    try {
        // Safely extract the token
        const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

        console.log('Cookies:', req.cookies); // Debugging logs
        console.log('Authorization Header:', req.headers.authorization);
        console.log('Extracted Token:', token);

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: Token missing' });
        }

        // Add the token to the blacklist
        await blackListTokenModel.create({ token });
        console.log('Token blacklisted successfully:', token);

        // Clear the token from cookies (if applicable)
        res.clearCookie('token');

        return res.status(200).json({ message: 'Logged out successfully' });
    } catch (err) {
        console.error('Logout Error:', err.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


