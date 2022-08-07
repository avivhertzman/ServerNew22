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
const dal = require('../DAL/AmadeusDal');
var getPlaces = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield dal.initApiKeyDictionary();
        res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        var places = yield dal.getPlaces(req.query.query);
        res.send(JSON.stringify(places));
    });
};
var getFlights = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let tripsList = [CreateTrip(0, 0, {}, originPlace, destinationPlace, 0)];
        tripsList.pop();
        if (req.body) {
            var people = req.body.people;
            var oneWay = req.body.oneWay;
            var { outbound, inbound } = handleDate(req.body.outboundDate, req.body.inboundDate, oneWay);
            var { originPlace, destinationPlace } = handlePlace(req.body.originPlace, req.body.destinationPlace);
            var currencies = "USD"; // Dollar
            validateDates(outbound, inbound);
            let fullRequest = getFullRequest(outbound, inbound, originPlace, destinationPlace, currencies);
            let serialized = JSON.stringify(fullRequest);
            yield dal.initApiKeyDictionary();
            let allData = yield dal.getFlights(serialized);
            let dictionaries = allData.dictionaries;
            let flights = allData.data;
            let outBound;
            let inBound;
            flights.forEach(offer => {
                outBound = getFlightOption(offer, dictionaries, 0);
                if (inbound != minDate) {
                    inBound = getFlightOption(offer, dictionaries, 1);
                }
                else {
                    inBound = undefined;
                }
                let trip = CreateTrip(outBound, inBound, {}, originPlace, destinationPlace, offer.price.total);
                tripsList.push(trip);
            });
        }
        res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.send(JSON.stringify(tripsList));
    });
};
const addDays = (date, days) => {
    date.setDate(date.getDate() + days);
    return date;
};
const addHours = (date, hours) => {
    return new Date(new Date(date).setHours(date.getHours() + hours));
};
const minDate = new Date("1/1/0001 12:00:00");
function handleDate(outboundDate, inboundDate, oneWay) {
    var outbound = new Date(outboundDate);
    var inbound = new Date(inboundDate);
    if (outbound == null) {
        outbound = addDays(new Date, 5);
        inbound = addDays(outbound, 5);
    }
    if (outbound === (new Date)) {
        outbound = addHours(outbound, 1);
    }
    if (inbound === (new Date)) {
        inbound = addDays(inbound, 1);
    }
    else if (inbound == minDate) {
        inbound = addDays(outbound, 1);
    }
    if (oneWay == "true") {
        inbound = minDate;
    }
    return { outbound, inbound };
}
function validateDates(outboundDate, inboundDate) {
    if (outboundDate < Date.now) {
        //throw new DateInPastException(DateType.outbound);
    }
    if (inboundDate != minDate) {
        if (inboundDate < Date.now) {
            //throw new DateInPastException(DateType.inbound);
        }
        if (inboundDate < outboundDate) {
            //throw new OutboundDateAfterInboundDateException(outboundDate, inboundDate);
        }
    }
}
function handlePlace(originPlace, destinationPlace) {
    //TODO
    return { originPlace, destinationPlace };
}
function getFullRequest(outbound, inbound, originPlace, destinationPlace, currencies) {
    originPlace = JSON.parse(originPlace);
    destinationPlace = JSON.parse(destinationPlace);
    let firstFlightRequest = getWantedFlight(originPlace.iataCode, destinationPlace.iataCode, outbound, '1');
    let flightList = [firstFlightRequest];
    if (inbound != minDate) {
        let secondFlightRequest = getWantedFlight(destinationPlace.iataCode, originPlace.iataCode, inbound, '2');
        flightList.push(secondFlightRequest);
    }
    let values = {
        "currencyCode": currencies,
        "sources": ["GDS"],
        "originDestinations": flightList,
        "travelers": [{ "id": "1", "travelerType": "ADULT" }]
    };
    return values;
}
function getWantedFlight(origionPlaceIata, destinationPlaceIata, takeOff, index) {
    return {
        'id': index,
        'originLocationCode': origionPlaceIata,
        'destinationLocationCode': destinationPlaceIata,
        'departureDateTimeRange': { 'date': getDateString(takeOff),
            'time': takeOff.toLocaleTimeString().split(' ')[0] }
    };
}
function getDateString(date) {
    const offset = date.getTimezoneOffset();
    date = new Date(date.getTime() - (offset * 60 * 1000));
    return date.toISOString().split('T')[0];
}
function getFlightOption(offer, dictionaries, index) {
    // הלוך
    let OutBounddepatureTime = offer.itineraries[index].segments[0].departure.at;
    let OutBoundArriveTime = offer.itineraries[index].segments[offer.itineraries[index].segments.length - 1].arrival.at;
    let OutBounddepatureTimeDate;
    let OutBoundArriveTimeDate;
    let fullDuration = getFullDuration(offer.itineraries[index].duration);
    //depature time
    OutBounddepatureTimeDate = new Date(OutBounddepatureTime);
    // arrive time
    OutBoundArriveTimeDate = new Date(OutBoundArriveTime);
    let depatures = [CreateFlight(0, 0, 0, 0, 0, 0, 0)];
    depatures.pop();
    offer.itineraries[index].segments.forEach(seg => {
        let carrierName = dictionaries.carriers[seg.carrierCode];
        let locationNameDepature = dictionaries.locations[seg.departure.iataCode];
        let locationNameArrival = dictionaries.locations[seg.arrival.iataCode];
        let flight = CreateFlight(seg.number, new Date(seg.departure.at), new Date(seg.arrival.at), CreateCarrier(seg.carrierCode, carrierName), getFullDuration(seg.duration), CreatePlace(seg.departure.iataCode, locationNameDepature.cityCode), CreatePlace(seg.arrival.iataCode, locationNameArrival.cityCode));
        depatures.push(flight);
    });
    return CreateFlightOption(OutBounddepatureTimeDate, OutBoundArriveTimeDate, fullDuration, depatures);
}
function CreateFlight(flightNumber, departure, arrive, carrier, duration, originPlace, destinationPlace) {
    return {
        'flightNumber': flightNumber,
        'departure': departure,
        'arrive': arrive,
        'carrier': carrier,
        'duration': duration,
        'originPlace': originPlace,
        'destinationPlace': destinationPlace
    };
}
function CreateFlightOption(OutBounddepatureTimeDate, OutBoundArriveTimeDate, fullDuration, depatures) {
    return {
        'departure': OutBounddepatureTimeDate,
        'arrive': OutBoundArriveTimeDate,
        'duration': fullDuration,
        'flights': depatures
    };
}
function CreatePlace(iataCode, name) {
    return {
        'iataCode': iataCode,
        'cityId': iataCode,
        'name': name,
        'address': { 'countryName': name }
    };
}
function CreateCarrier(id, name) {
    return {
        'CarrierId': id,
        'Name': name
    };
}
function CreateTrip(outbound, inbound, agents, originPlace, destinationPlace, Price) {
    return {
        'outbound': outbound,
        'inbound': inbound,
        'agents': agents,
        'originPlace': originPlace,
        'destinationPlace': destinationPlace,
        'Price': Price
    };
}
function getFullDuration(fullDuration) {
    return parseInt(fullDuration.split('PT')[1].split('H')[0]) * 60 + parseInt(fullDuration.split('PT')[1].split('H')[1].split('M')[0]);
}
exports.getPlaces = getPlaces;
exports.getFlights = getFlights;
//# sourceMappingURL=AmadeusController.js.map