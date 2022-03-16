"use strict";
var fetchh = require('node-fetch');
// const https = require('https');
var initApiKeyDictionary = function initApdiKeyDictionary() {
    let body = { grant_type: 'client_credentials',
        client_id: "Hyy63sVudmCA41anZvu3ZQHuyHeyWkIo",
        client_secret: "RQPAXOpXCD0VDRFj" };
    //node fetch module is loaded to be able to make use of fetch function
    //the content to be posted to the website is defined
    //the URL of the website to which the content must be posted is passed as a parameter to the fetch function along with specifying the method, body and header
    fetchh('https://test.api.amadeus.com/v1/security/oauth2/token', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
        //then() function is used to convert the posted contents to the website into json format
        .then(result => result.json())
        //the posted contents to the website in json format is displayed as the output on the screen
        .then(jsonformat => console.log(jsonformat)).catch(err => console.log(err));
    ;
};
exports.initApiKeyDictionary = initApiKeyDictionary;
//# sourceMappingURL=AmadeusDal.js.map