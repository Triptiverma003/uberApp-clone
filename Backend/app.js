const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
const mapsRoute = require('./routes/maps.routes');
const rideRoutes = require('./routes/ride.route');
connectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/maps' , mapsRoute);
app.use('/rides' , rideRoutes);

app.use(cookieParser());
app.get('/', (req, res) => {
  res.send('Hello World!');
});


module.exports = app;   
