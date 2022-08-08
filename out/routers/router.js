"use strict";
var express1 = require('express');
var AmadeusController = require('../Controller/AmadeusController');
var UserController = require('../Controller/UserController');
var bodyParser = require('body-parser');
var router = express1.Router();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
// Home page route.
router.get('/', function (req, res) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send('Wiki home page');
});
router.get('/GetPlaces', AmadeusController.getPlaces);
router.post('/GetFlights', urlencodedParser, AmadeusController.getFlights);
router.post('/ValidateUser', urlencodedParser, UserController.validateUser);
router.post('/RegisterUser', urlencodedParser, UserController.registerUser);
module.exports = router;
//# sourceMappingURL=router.js.map