var express1 = require('express');
var AmadeusController = require('../Controller/AmadeusController');
var router = express1.Router();

// Home page route.
router.get('/', function (req: any, res:any) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.send('Wiki home page');
})

router.get('/GetPlaces', AmadeusController.getPlaces);

module.exports = router;