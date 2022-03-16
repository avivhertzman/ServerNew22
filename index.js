"use strict";
var express1 = require('express');
var router = require('./routers/router');
const app = express1();
const port = 8000;
app.use('/hi', router);
//app.get('/', function (req, res) {
// res.send('207196635')
//})
app.listen(port, () => {
    console.log(`Example app listening on ${port}`);
});
//# sourceMappingURL=index.js.map