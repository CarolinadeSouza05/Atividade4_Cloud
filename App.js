const express = require("express");

const bodyParser = require("body-parser");
const os = require("os");

const app = express();

const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: 'localhost', // Altere para o host do seu contêiner se necessário
  user: 'root', // Substitua pelo seu usuário
  password: '123456', // Substitua pela sua senha
  database: 'sys', // Substitua pelo nome do seu banco de dados
  connectionLimit: 5,
  port: '3010'
});

//const pool = require('./db');
app.use(bodyParser.json());

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


// Nova rota para exibir os dados da tabela entregador
app.get("/entregadores", async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM entregador");
        return res
            .status(200)
            .json({
                status: true,
                data: rows
            });
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({
                status: false,
                mensagem: "Erro ao buscar dados"
            });
    } finally {
        if (conn) conn.release();
    }
});

module.exports = app;