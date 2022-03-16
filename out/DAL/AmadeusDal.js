"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var fetchh = require('node-fetch');
const jwt = require('jsonwebtoken');
var b;
const https = require('https');
var initApiKeyDictionary = function initApdiKeyDictionary() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield fetchh('https://test.api.amadeus.com/v1/security/oauth2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'grant_type': 'client_credentials',
                'client_id': 'Hyy63sVudmCA41anZvu3ZQHuyHeyWkIo',
                'client_secret': 'RQPAXOpXCD0VDRFj'
            })
        }).then(result => result.json()).
            then(jsonformat => {
            //  console.log(jsonformat); 
            global.key = jsonformat['access_token'];
            b = jsonformat['access_token'];
            //   b = jwt.sign({}, jsonformat['access_token'], { expiresIn: '1m'})}
        }).catch(err => console.log(err));
    });
};
var getPlacesFunc = function getPlaces(query) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(b);
        const e = 'Bearer ' + b;
        console.log(b);
        var res = yield fetchh('https://test.api.amadeus.com/v1/reference-data/locations?subType=AIRPORT,CITY&keyword=' + query, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': e
            }
        });
        var c = yield res.json();
        console.log(c);
        return parseLocation(c);
    });
};
function parseLocation(locations) {
    var newPlaces = [];
    var place;
    locations.data.forEach(element => {
        place = { iataCode: element.iataCode, name: element.name, placeName: element.name.toLowerCase(), id: element.id, address: {
                countryName: element.address.countryName.toLowerCase()
            }, countryName: element.address.countryName.toLowerCase(),
            placeId: element.iataCode,
            airportId: element.id };
        newPlaces.push(place);
    });
    return newPlaces;
}
exports.initApiKeyDictionary = initApiKeyDictionary;
exports.getPlaces = getPlacesFunc;
//# sourceMappingURL=AmadeusDal.js.map