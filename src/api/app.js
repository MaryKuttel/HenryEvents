const express = require("express");
const morgan = require("morgan");
const serverExpress = express();
const routes = require("./routes/index.js")
const cors = require('cors')
require("./config/db.js");
serverExpress.use(cors())
serverExpress.use(morgan("dev"));
serverExpress.use(express.json());
serverExpress.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});
serverExpress.use("/", routes)
serverExpress.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
});


module.exports = serverExpress;