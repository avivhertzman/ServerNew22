"use strict";
var express1 = require('express');
var AmadeusController = require('../Controller/AmadeusController');
var UserController = require('../Controller/UserController');
var router = express1.Router();
// Home page route.
router.get('/', function (req, res) {
    res.send('Wiki home page');
});
router.get('/hi', AmadeusController.a);
router.get('/hi', UserController.a);
module.exports = router;
//# sourceMappingURL=router.js.map