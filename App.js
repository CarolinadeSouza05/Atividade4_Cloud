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
            mensagem:"Meu app está vivo" ,
            path: process.cwd(),
        });
});

app.get("/readiness", (req, res) => {
    return res
        .status(200)
        .json({
            status:true,
            mensagem:"Meu app está pronto",
            platform: os.platform(),
            freemem: os.freemem(),
            homedir:os.homedir(),
            date:new Date().getTime()
        });
});

module.exports = app;