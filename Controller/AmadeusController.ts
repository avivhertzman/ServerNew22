const dal = require('../DAL/AmadeusDal')

  var getPlaces = async function (req: any, res: any) {
    dal.initApiKeyDictionary();
    res.header("Access-Control-Allow-Origin", "http://localhost:4201"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var places = await dal.getPlaces(req.query.query);
    res.send(JSON.stringify(places));
  } 
  exports.getPlaces = getPlaces;