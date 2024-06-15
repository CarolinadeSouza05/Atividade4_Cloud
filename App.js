const express = require("express");
const bodyParser = require("body-parser");
const os = require("os");
const mysql = require('mysql2/promise');
const app = express();



const pool = mysql.createPool({
  host: 'db', // Altere para o host do seu contêiner se necessário
  user: 'root', // Substitua pelo seu usuário
  password: 'root', // Substitua pela sua senha
  database: 'sys', // Substitua pelo nome do seu banco de dados
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
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
        console.log("Conexão obtida com sucesso");
        const [rows] = await conn.query("SELECT * FROM entregador");
        return res.status(200).json({
            status: true,
            data: rows
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: false,
            mensagem: "Erro ao buscar dados"
        });
    } finally {
        if (conn) conn.release();
    }
});

module.exports = app;