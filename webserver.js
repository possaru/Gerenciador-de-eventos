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

let VERIFIED_IP_ACCESS = []

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
app.get(["/login", "/home", "/eventos", "/eventos/:id", "/usuarios", "/contatos", "/cadastrocontatos", "/cadastroeventos", "/cadastrousuarios"], load_page);

app.get(["/eventos=rows", "/usuarios=rows", "/contatos=rows"], load_db_rows); //Requerimento de dados
app.get("/eventos/:id/row", load_evento);

app.get("/login/cred_check=/:id/:pass", (req, res) => {
    let id = req.params.id;
    let pass = req.params.pass;
    access_report(req, res);
    console.log(`>>[Credential check] -- (id: ${id} | pass: ${pass})`);

    db_connection.query(
        `SELECT * FROM usuarios WHERE login LIKE '${id}'`,
        function (err, result, fields) {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            } else if (result == "") {
                console.log("Invalid User\n")
                res.setHeader('Content-Type', 'application/json');
                res.send({ credential_check: 'invalid user' });
            } else {
                if (result[0]['login'] == id &&
                    result[0]['senha'] == pass) {
                    console.log("Success\n")
                    res.setHeader('Content-Type', 'application/json');
                    res.send({ credential_check: 'valid user' });

                    let ip = req.ip;
                    VERIFIED_IP_ACCESS.push(req.ip)
                } else {
                    console.log('Invalid Pass\n');
                    res.setHeader('Content-Type', 'application/json');
                    res.send({ credential_check: 'invalid pass' });
                }
            }
        }
    );
})

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
    let allow = false;

    for (i in VERIFIED_IP_ACCESS) {

        if (req.ip == VERIFIED_IP_ACCESS[i]) { allow = true }
    }

    if (req.url != "/login") {
        if (allow == false) {
            console.log("!! User unverified -- Redirecting to [/login] !!\n");
            return res.redirect(`${base_url}/login`)
        }
    } else if (req.url == "/login" && allow == true) {
        return res.redirect(`${base_url}/home`)
    }

    let filePath;

    if (req.url.slice(0, 9) == '/eventos/' && req.url.slice(9) >= 0) {
        filePath = path.join(__dirname, 'public', `eventosfull.html`);
    }
    else {
        filePath = path.join(__dirname, 'public', `${req.url}.html`);
    }

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

function load_evento(req, res) {
    console.log("mysql query at url: " + req.url);
    const id = req.url.replace('/eventos/', '').replace('/row', '')
    console.log(`Mysql> Getting row ${id} from [eventos]`)

    db_connection.query(
        `SELECT * FROM eventos LIMIT ${id},1`,
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