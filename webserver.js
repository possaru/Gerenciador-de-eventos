const http = require('node:http');
const fs = require('node:fs');
const express = require('express');
const mysql = require('mysql2')

const app = express();

const hostname = 'localhost';
const port = 3000
const base_url = `http://${hostname}:${port}`



const db_connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', //Mudar credenciais de acordo com sua configuração.
    password: 'root',
    database: 'gerenciador_DB', //Necessário executar o script ["mysql_setup.sql"]. Verifique o README.
})
//====================================================================

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));;

//Links
//vvvvvvvvvvvvvv
app.get("/", (req, res) => {
    access_report(req);
    console.log(`${base_url}/login`);
    res.status(301).redirect(`${base_url}/login`)
    res.end()
    console.log(`Redirecting to [/login]`);
})
app.get(["/login", "/home", "/eventos", "/usuarios", "/contatos", "/cadastrocontatos", "/cadastroeventos", "/cadastrousuarios"], load_page);

app.get(["/eventos=rows", "/usuarios=rows", "/contatos=rows"], load_db_rows); //Requerimento de dados

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})
//^^^^^^^^^^^^^^
//====================================================================

function access_report(req) {
    console.log(`Request at [%c${req.url}] from ${req.ip}`, "color: orange");
    console.log(`>>[%c${req.url}] accessed\n\n`, "color: orange");
}

function load_page(req, res) {
    access_report(req);

    const filePath = path.join(__dirname, 'public', `${req.url}.html`);

    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send("Página não encontrada");
    }
}

function load_db_rows(req, res) {
    access_report(req);

    let url = req.url.slice(1).replace('=rows', '');
    console.log(`Mysql> Getting table [${url}]`);

    db_connection.query(
        `SELECT * FROM ${url}`,
        function (err, result, fields) {

            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }

            res.setHeader('Content-Type', 'application/json');
            res.send(result);
        }
    );
}