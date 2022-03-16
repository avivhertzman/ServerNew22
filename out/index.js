"use strict";
var express1 = require('express');
var router = require('./routers/router');
const app = express1();
const port = 8000;
app.use('/api/AmadeusController', router);
app.listen(port, () => {
    console.log(`Example app listening on ${port}`);
});
//# sourceMappingURL=index.js.map