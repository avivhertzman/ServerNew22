"use strict";
const dal = require('../DAL/AmadeusDal');
var a = function (req, res) {
    res.send('hi');
    dal.initApiKeyDictionary();
};
exports.a = a;
//# sourceMappingURL=AmadeusController.js.map