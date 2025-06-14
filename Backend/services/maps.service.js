const axios = require('axios');
const captainModel = require('../models/captain.model');
module.exports.getAddressCoordinate = async (address) => {
    console.log("Fetching coordinates for:", address);
    const apiKey = process.env.API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        console.log("Google API Response:", response.data); // Debugging

        if (response.data.results.length > 0) {
            const location = response.data.results[0].geometry.location;
            return {
                lat: location.lat, // Changed from 'ltd' to 'lat'
                lng: location.lng
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error("Geocoding Error:", error);
        throw new Error('Error fetching coordinates');
    }
}

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const apiKey = process.env.API_KEY;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
    
    try {
        console.log("Fetching distance for:", origin, "to", destination);
        const response = await axios.get(url);
        console.log("Distance Matrix Response:", response.data); // Debugging

        if (response.data.status === 'OK') {
            if (response.data.rows[0].elements[0].status === 'ZERO_RESULTS') {
                throw new Error('No routes found');
            }
            return response.data.rows[0].elements[0];
        } else {
            throw new Error('Unable to fetch distance and time');
        }
    } catch (err) {
        console.error("Distance Matrix Error:", err);
        throw err;
    }
}

module.exports.getAutoCompleteSuggestion = async(input) =>{
    if(!input){
        throw new Error('query is required')
    }

    const apiKey = process.env.API_KEY
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try{
        const response = await axios.get(url);
        if(response.data.status === 'OK'){
            return response.data.predictions;
        }else{
            throw new Error ('Unable to fetch suggestions')
        }
    }catch{
        console.error(err);
        throw new err;
    }
}

module.exports.getTheCaptainInRadius = async(ltd , lng , radius)=>{
    console.log(`Searching captains within ${radius} meters of [${ltd}, ${lng}]`);
    const captains = await captainModel.find({
        location:{
            $geoWithin: {
                $centerSphere: [[ltd, lng], radius/6371]
            }
        }
    });
    console.log(`captain retrieved:  ${captains}`)
    return captains;
}