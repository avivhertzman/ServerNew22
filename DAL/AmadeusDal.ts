var fetchh = require('node-fetch');
const jwt = require('jsonwebtoken')
var b;

 const https = require('https');


 var initApiKeyDictionary = async function initApdiKeyDictionary() {
  return await fetchh('https://test.api.amadeus.com/v1/security/oauth2/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
        body: new URLSearchParams({
            'grant_type': 'client_credentials',
            'client_id': 'Hyy63sVudmCA41anZvu3ZQHuyHeyWkIo',
            'client_secret': 'RQPAXOpXCD0VDRFj'
        })
    }).then(result =>result.json()).
    then(jsonformat => {
     global.key = jsonformat['access_token'];
     b = jsonformat['access_token'];
     } ).catch(err => console.log(err));
}

var getPlacesFunc = async function getPlaces(query: string) {
  const e = 'Bearer '+b;
  var res = await fetchh('https://test.api.amadeus.com/v1/reference-data/locations?subType=AIRPORT,CITY&keyword='+query, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': e
      }
});
var c = await res.json();
return parseLocation(c);
}

function parseLocation(locations) {
  var newPlaces: any = [];
  var place;
  locations.data.forEach(element => {
    place = {iataCode: element.iataCode, name: element.name, placeName: element.name.toLowerCase(), id: element.id, address: {
      countryName: element.address.countryName.toLowerCase()
    }, countryName: element.address.countryName.toLowerCase(),
     placeId: element.iataCode,
      airportId: element.id }
    newPlaces.push(place);
  });
  return newPlaces;

}

var getFlightsFunc = async function getFlights(body: string) {
const e = 'Bearer '+b;
  var res = await fetchh('https://test.api.amadeus.com/v2/shopping/flight-offers', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': e
      },
    body
  });
  var response = await res.json();
  return response;
}

 exports.initApiKeyDictionary = initApiKeyDictionary;
 exports.getPlaces = getPlacesFunc;
 exports.getFlights = getFlightsFunc;