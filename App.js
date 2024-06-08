const express = require("express");
const bodyParser = require("body-parser");

const os = require("os");

const app = express();

app.get("/", (req, res) => {
    return res
        .status(200)
        .json({
            status:true,
            mensagem:"OK"
        });
});

app.get("/liveness", (req, res) => {
    return res
        .status(200)
        .json({
            status:true,
            mensagem:"OK 1" 
        });
});

app.get("/readiness", (req, res) => {
    return res
        .status(200)
        .json({
            status:true,
            mensagem:"OK 2"
        });
});

module.exports = app;