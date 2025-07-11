Backend API Documentation

##/users/register
Description
 Registers a new user by creating a user account with the provided information.

HTTP Method
 POST

Request Body
 The request body should be in JSON format and include the following fields:

fullname (object):
firstname (string, required): User's first name (minimum 3 characters).
lastname (string, optional): User's last name (minimum 3 characters).
email (string, required): User's email address (must be a valid email).
password (string, required): User's password (minimum 6 characters).
Example Response
user (object):
fullname (object).
firstname (string): User's first name (minimum 3 characters).
lastname (string): User's last name (minimum 3 characters).
email (string): User's email address (must be a valid email).
password (string): User's password (minimum 6 characters).
token (String): JWT Token


##/users/login Endpoint
Description
Authenticates a user using their email and password, returning a JWT token upon successful login.

HTTP Method
POST

Endpoint
/users/login

Request Body
The request body should be in JSON format and include the following fields:

email (string, required): User's email address (must be a valid email).
password (string, required): User's password (minimum 6 characters).
Example Response
user (object):
fullname (object).
firstname (string): User's first name (minimum 3 characters).
lastname (string): User's last name (minimum 3 characters).
email (string): User's email address (must be a valid email).
password (string): User's password (minimum 6 characters).
token (String): JWT Token


## /users/profile Endpoint
Description
Retrieves the profile information of the currently authenticated user.

HTTP Method
GET

Authentication
Requires a valid JWT token in the Authorization header: Authorization: Bearer <token>

Example Response
user (object):
fullname (object).
firstname (string): User's first name (minimum 3 characters).
lastname (string): User's last name (minimum 3 characters).
email (string): User's email address (must be a valid email).


## /users/logout Endpoint
Description
Logout the current user and blacklist the token provided in cookie or headers

HTTP Method
GET

Authentication
Requires a valid JWT token in the Authorization header or cookie:

user (object):
fullname (object).
firstname (string): User's first name (minimum 3 characters).
lastname (string): User's last name (minimum 3 characters).
email (string): User's email address (must be a valid email).
password (string): User's password (minimum 6 characters).
token (String): JWT Token## /captains/register Endpoint
Description
Registers a new captain by creating a captain account with the provided information.

HTTP Method
POST

Request Body
The request body should be in JSON format and include the following fields:

fullname (object):
firstname (string, required): Captain's first name (minimum 3 characters)
lastname (string, optional): Captain's last name
email (string, required): Captain's email address (must be a valid email)
password (string, required): Captain's password (minimum 6 characters)
vehicle (object):
color (string, required): Vehicle color (minimum 3 characters)
plate (string, required): Vehicle plate number (minimum 3 characters)
capacity (number, required): Vehicle passenger capacity (minimum 1)
vehicleType (string, required): Type of vehicle (must be 'car', 'motorcycle', or 'auto')
Example Response


## /captains/register Endpoint
Description
Registers a new captain by creating a captain account with the provided information.

HTTP Method
POST

Request Body
The request body should be in JSON format and include the following fields:

fullname (object):
firstname (string, required): Captain's first name (minimum 3 characters).
lastname (string, optional): Captain's last name (minimum 3 characters).
email (string, required): Captain's email address (must be a valid email).
password (string, required): Captain's password (minimum 6 characters).
vehicle (object):
color (string, required): Vehicle color (minimum 3 characters).
plate (string, required): Vehicle plate number (minimum 3 characters).
capacity (number, required): Vehicle passenger capacity (minimum 1).
vehicleType (string, required): Type of vehicle (must be 'car', 'motorcycle', or 'auto').
Example Response
captain (object):
fullname (object).
firstname (string): Captain's first name (minimum 3 characters).
lastname (string): Captain's last name (minimum 3 characters).
email (string): Captain's email address (must be a valid email).
password (string): Captain's password (minimum 6 characters).
vehicle (object):
color (string): Vehicle color.
plate (string): Vehicle plate number.
capacity (number): Vehicle passenger capacity.
vehicleType (string): Type of vehicle.
token (String): JWT Token


## /captains/login Endpoint
Description
Authenticates a captain using their email and password, returning a JWT token upon successful login.

HTTP Method
POST

Endpoint
/captains/login

Request Body
The request body should be in JSON format and include the following fields:

email (string, required): Captain's email address (must be a valid email).
password (string, required): Captain's password (minimum 6 characters).
Example Response
captain (object):
fullname (object).
firstname (string): Captain's first name (minimum 3 characters).
lastname (string): Captain's last name (minimum 3 characters).
email (string): Captain's email address (must be a valid email).
password (string): Captain's password (minimum 6 characters).
vehicle (object):
color (string): Vehicle color.
plate (string): Vehicle plate number.
capacity (number): Vehicle passenger capacity.
vehicleType (string): Type of vehicle.
token (String): JWT Token


## /captains/profile Endpoint
Description
Retrieves the profile information of the currently authenticated captain.

HTTP Method
GET

Authentication
Requires a valid JWT token in the Authorization header: Authorization: Bearer <token>

Example Response
captain (object):
fullname (object).
firstname (string): Captain's first name (minimum 3 characters).
lastname (string): Captain's last name (minimum 3 characters).
email (string): Captain's email address (must be a valid email).
vehicle (object):
color (string): Vehicle color.
plate (string): Vehicle plate number.
capacity (number): Vehicle passenger capacity.
vehicleType (string): Type of vehicle.


## /captains/logout Endpoint
Description
Logout the current captain and blacklist the token provided in cookie or headers.

HTTP Method
GET

Authentication
Requires a valid JWT token in the Authorization header or cookie.

Example Response
message (string): Logout successfully.


## /maps//get-coordinates End Point

Description
Retrieves the coordinates (latitude and longitude) for a given address.

HTTP Method
GET

Request Parameters
address (string, required): The address for which to retrieve coordinates.
Example Request
GET /maps/get-coordinates?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA

Example Response
{
  "ltd": 37.4224764,
  "lng": -122.0842499
}
Error Response
400 Bad Request: If the address parameter is missing or invalid.
404 Not Found: If the coordinates for the given address could not be found.
{
  "message": "Coordinates not found"
}

## /maps//get-distance-time

Description
Retrieves the distance and estimated travel time between two locations.

HTTP Method
GET

Request Parameters
origin (string, required): The starting address or location.
destination (string, required): The destination address or location.
Example Request
GET /maps/get-distance-time?origin=New+York,NY&destination=Los+Angeles,CA
Example Response
{
  "distance": {
    "text": "2,789 miles",
    "value": 4486540
  },
  "duration": {
    "text": "1 day 18 hours",
    "value": 154800
  }
}
Error Response
400 Bad Request: If the origin or destination parameter is missing or invalid.
404 Not Found: If the distance and time for the given locations could not be found.
{
  "message": "No routes found"
}

## /maps//get-suggestion Endpoint

Description
Retrieves autocomplete suggestions for a given input string.

HTTP Method
GET

Request Parameters
input (string, required): The input string for which to retrieve suggestions.
Example Request
GET /maps/get-suggestions?input=1600+Amphitheatre
Example Response
[
  "1600 Amphitheatre Parkway, Mountain View, CA, USA",
  "1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA"
]
Error Response
400 Bad Request: If the input parameter is missing or invalid.
500 Internal Server Error: If there is an error retrieving suggestions.
{
  "message": "Unable to fetch suggestions"
}


HTTP Method
GET

Endpoint
## /rides/get-fare

Authentication
Requires a valid JWT token provided in the Authorization header:

Request Parameters

pickup (string, required): The pickup address. Must be at least 3 characters long.
destination (string, required): The destination address. Must be at least 3 characters long.
Example Request

Example Response

Note: The response object contains fare estimates for each vehicle type calculated using predefined base fares, per kilometer, and per minute rates.

Error Response

400 Bad Request
If the pickup or destination parameters are missing or invalid, e.g.:
500 Internal Server Error
If an error occurs while calculating the fare, the response will include:
Implementation can be found in ride.route.js and rides.controller.js.
Backend API Documentation

##/users/register
Description
 Registers a new user by creating a user account with the provided information.

HTTP Method
 POST

Request Body
 The request body should be in JSON format and include the following fields:

fullname (object):
firstname (string, required): User's first name (minimum 3 characters).
lastname (string, optional): User's last name (minimum 3 characters).
email (string, required): User's email address (must be a valid email).
password (string, required): User's password (minimum 6 characters).
Example Response
user (object):
fullname (object).
firstname (string): User's first name (minimum 3 characters).
lastname (string): User's last name (minimum 3 characters).
email (string): User's email address (must be a valid email).
password (string): User's password (minimum 6 characters).
token (String): JWT Token


##/users/login Endpoint
Description
Authenticates a user using their email and password, returning a JWT token upon successful login.

HTTP Method
POST

Endpoint
/users/login

Request Body
The request body should be in JSON format and include the following fields:

email (string, required): User's email address (must be a valid email).
password (string, required): User's password (minimum 6 characters).
Example Response
user (object):
fullname (object).
firstname (string): User's first name (minimum 3 characters).
lastname (string): User's last name (minimum 3 characters).
email (string): User's email address (must be a valid email).
password (string): User's password (minimum 6 characters).
token (String): JWT Token


## /users/profile Endpoint
Description
Retrieves the profile information of the currently authenticated user.

HTTP Method
GET

Authentication
Requires a valid JWT token in the Authorization header: Authorization: Bearer <token>

Example Response
user (object):
fullname (object).
firstname (string): User's first name (minimum 3 characters).
lastname (string): User's last name (minimum 3 characters).
email (string): User's email address (must be a valid email).


## /users/logout Endpoint
Description
Logout the current user and blacklist the token provided in cookie or headers

HTTP Method
GET

Authentication
Requires a valid JWT token in the Authorization header or cookie:

user (object):
fullname (object).
firstname (string): User's first name (minimum 3 characters).
lastname (string): User's last name (minimum 3 characters).
email (string): User's email address (must be a valid email).
password (string): User's password (minimum 6 characters).
token (String): JWT Token## /captains/register Endpoint
Description
Registers a new captain by creating a captain account with the provided information.

HTTP Method
POST

Request Body
The request body should be in JSON format and include the following fields:

fullname (object):
firstname (string, required): Captain's first name (minimum 3 characters)
lastname (string, optional): Captain's last name
email (string, required): Captain's email address (must be a valid email)
password (string, required): Captain's password (minimum 6 characters)
vehicle (object):
color (string, required): Vehicle color (minimum 3 characters)
plate (string, required): Vehicle plate number (minimum 3 characters)
capacity (number, required): Vehicle passenger capacity (minimum 1)
vehicleType (string, required): Type of vehicle (must be 'car', 'motorcycle', or 'auto')
Example Response


## /captains/register Endpoint
Description
Registers a new captain by creating a captain account with the provided information.

HTTP Method
POST

Request Body
The request body should be in JSON format and include the following fields:

fullname (object):
firstname (string, required): Captain's first name (minimum 3 characters).
lastname (string, optional): Captain's last name (minimum 3 characters).
email (string, required): Captain's email address (must be a valid email).
password (string, required): Captain's password (minimum 6 characters).
vehicle (object):
color (string, required): Vehicle color (minimum 3 characters).
plate (string, required): Vehicle plate number (minimum 3 characters).
capacity (number, required): Vehicle passenger capacity (minimum 1).
vehicleType (string, required): Type of vehicle (must be 'car', 'motorcycle', or 'auto').
Example Response
captain (object):
fullname (object).
firstname (string): Captain's first name (minimum 3 characters).
lastname (string): Captain's last name (minimum 3 characters).
email (string): Captain's email address (must be a valid email).
password (string): Captain's password (minimum 6 characters).
vehicle (object):
color (string): Vehicle color.
plate (string): Vehicle plate number.
capacity (number): Vehicle passenger capacity.
vehicleType (string): Type of vehicle.
token (String): JWT Token


## /captains/login Endpoint
Description
Authenticates a captain using their email and password, returning a JWT token upon successful login.

HTTP Method
POST

Endpoint
/captains/login

Request Body
The request body should be in JSON format and include the following fields:

email (string, required): Captain's email address (must be a valid email).
password (string, required): Captain's password (minimum 6 characters).
Example Response
captain (object):
fullname (object).
firstname (string): Captain's first name (minimum 3 characters).
lastname (string): Captain's last name (minimum 3 characters).
email (string): Captain's email address (must be a valid email).
password (string): Captain's password (minimum 6 characters).
vehicle (object):
color (string): Vehicle color.
plate (string): Vehicle plate number.
capacity (number): Vehicle passenger capacity.
vehicleType (string): Type of vehicle.
token (String): JWT Token


## /captains/profile Endpoint
Description
Retrieves the profile information of the currently authenticated captain.

HTTP Method
GET

Authentication
Requires a valid JWT token in the Authorization header: Authorization: Bearer <token>

Example Response
captain (object):
fullname (object).
firstname (string): Captain's first name (minimum 3 characters).
lastname (string): Captain's last name (minimum 3 characters).
email (string): Captain's email address (must be a valid email).
vehicle (object):
color (string): Vehicle color.
plate (string): Vehicle plate number.
capacity (number): Vehicle passenger capacity.
vehicleType (string): Type of vehicle.


## /captains/logout Endpoint
Description
Logout the current captain and blacklist the token provided in cookie or headers.

HTTP Method
GET

Authentication
Requires a valid JWT token in the Authorization header or cookie.

Example Response
message (string): Logout successfully.


## /maps//get-coordinates End Point

Description
Retrieves the coordinates (latitude and longitude) for a given address.

HTTP Method
GET

Request Parameters
address (string, required): The address for which to retrieve coordinates.
Example Request
GET /maps/get-coordinates?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA

Example Response
{
  "ltd": 37.4224764,
  "lng": -122.0842499
}
Error Response
400 Bad Request: If the address parameter is missing or invalid.
404 Not Found: If the coordinates for the given address could not be found.
{
  "message": "Coordinates not found"
}

## /maps//get-distance-time

Description
Retrieves the distance and estimated travel time between two locations.

HTTP Method
GET

Request Parameters
origin (string, required): The starting address or location.
destination (string, required): The destination address or location.
Example Request
GET /maps/get-distance-time?origin=New+York,NY&destination=Los+Angeles,CA
Example Response
{
  "distance": {
    "text": "2,789 miles",
    "value": 4486540
  },
  "duration": {
    "text": "1 day 18 hours",
    "value": 154800
  }
}
Error Response
400 Bad Request: If the origin or destination parameter is missing or invalid.
404 Not Found: If the distance and time for the given locations could not be found.
{
  "message": "No routes found"
}

## /maps//get-suggestion Endpoint

Description
Retrieves autocomplete suggestions for a given input string.

HTTP Method
GET

Request Parameters
input (string, required): The input string for which to retrieve suggestions.
Example Request
GET /maps/get-suggestions?input=1600+Amphitheatre
Example Response
[
  "1600 Amphitheatre Parkway, Mountain View, CA, USA",
  "1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA"
]
Error Response
400 Bad Request: If the input parameter is missing or invalid.
500 Internal Server Error: If there is an error retrieving suggestions.
{
  "message": "Unable to fetch suggestions"
}


HTTP Method
GET

Endpoint
## /rides/get-fare

Authentication
Requires a valid JWT token provided in the Authorization header:

Request Parameters

pickup (string, required): The pickup address. Must be at least 3 characters long.
destination (string, required): The destination address. Must be at least 3 characters long.
Example Request

Example Response

Note: The response object contains fare estimates for each vehicle type calculated using predefined base fares, per kilometer, and per minute rates.

Error Response

400 Bad Request
If the pickup or destination parameters are missing or invalid, e.g.:
500 Internal Server Error
If an error occurs while calculating the fare, the response will include:
Implementation can be found in ride.route.js and rides.controller.js.