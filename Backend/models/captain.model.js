const mongoose = require('mongoose');
const { loginUser } = require('../controllers/user.controller');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,'Firstname should be atleast 3 characters long'],
        },
        lastname:{
            type:String,
            minlength:[3,'Lastname should be atleast 3 characters long'],
        },
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        match:[/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,'Invalid email'],
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    socketId:{
        type:String,
    },
    Status : {
        type:String,
        enum:['active','inactive'],
        default:'inactive',
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minlength:[3,'Color should be atleast 3 characters long'],
        },
        plate:{
            type:String,
            required:true,
            minlength:[3,'Plate should be atleast 3 characters long'],
        },
        capacity:{
            type:Number,
            required:true,
            minlength:[1,'Capacity should be atleast 1 characters long'],
        },
        vehicleType:{
            type:String,
            enum:['car','motorcycle','auto'],
            required:true,
        },
    },
    location:{
        lng:{
            type:Number,
        },
        ltd:{
            type:Number,
        },
    }
})

captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id},process.env.JWT_SECRET,{expiresIn:'24h'});
    return token;
}

captainSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

captainSchema.statics.hashedPassword = async function(password){
    return await bcrypt.hash(password,12);
}

const captainModel = mongoose.model('captain',captainSchema);

module.exports = captainModel;