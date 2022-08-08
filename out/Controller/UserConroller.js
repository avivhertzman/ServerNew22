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
var getUser = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let isValidUser = false;
        var email = req.body.email;
        var pass = req.body.pass;
        if (true) {
            isValidUser = true;
        }
        res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.send(JSON.stringify(isValidUser));
    });
};
exports.getUser = getUser;
//# sourceMappingURL=UserConroller.js.map