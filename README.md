# SmartTerra Server
This is the server for the SmartTerra project. It is a RESTful API that provides access to the data stored in the database. The server is built using Node.js and Express.js.

## MQTT Broker Information
See `config.js`.

## Installation
1. Clone the repository.
2. Run `npm install` to install the dependencies.
3. Run `node server.js` to start the server.

## API Endpoints
### GET /api/sensors
Returns a list of all sensors in the database.
### POST /api/commands/send
Sends a command to a device. The body of the request should be a JSON object with the following properties:
{
  "pump":true,
  "duration": 5
}