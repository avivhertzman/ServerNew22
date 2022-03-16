"use strict";
var express1 = require('express');
var AmadeusController = require('../Controller/AmadeusController');
var router = express1.Router();
// Home page route.
router.get('/', function (req, res) {
    res.send('Wiki home page');
});
router.get('/hi', AmadeusController.a);
module.exports = router;
//# sourceMappingURL=router.js.map