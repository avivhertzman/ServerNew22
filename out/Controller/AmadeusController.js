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
var a = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.header("Access-Control-Allow-Origin", "http://localhost:4201"); // update to match the domain you will make the request from
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.send('hi');
        yield dal.initApiKeyDictionary();
    });
};
var getPlaces = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.header("Access-Control-Allow-Origin", "http://localhost:4201"); // update to match the domain you will make the request from
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        var places = yield dal.getPlaces(req.query.query);
        res.send(JSON.stringify(places));
    });
};
exports.a = a;
exports.getPlaces = getPlaces;
//# sourceMappingURL=AmadeusController.js.map