const http = require('node:http');
const fs = require('node:fs');
const express = require('express');

const app = express();

const hostname = 'localhost';
const port = 3000
const base_url = `http://${hostname}:${port}`



//====================================================================

app.use(express.static('public'));

app.get("/", (req, res) => {
    access_report(req);
    console.log(`${base_url}/login`);
    res.status(301).redirect(`${base_url}/login`)
    res.end()
    console.log(`Redirecting to [/login]`);
})

app.get("/login", (req, res) => {
    access_report(req);
    load_page(req, res);
})

app.get("/home", (req, res) => {
    access_report(req);
    load_page(req, res);
})

app.get("/eventos", (req, res) => {
    access_report(req);
    load_page(req, res);
})

app.get("/usuarios", (req, res) => {
    access_report(req);
    load_page(req, res);
})

app.get("/contatos", (req, res) => {
    access_report(req);
    load_page(req, res);
})

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})

//====================================================================

function access_report(req) {
    console.log(`Request at [%c${req.url}] from ${req.ip}`, "color: orange");
    console.log(`>>[%c${req.url}] accessed\n\n`, "color: orange");
}

function load_page(req, res) {
    res.writeHead(200, "success", { "content-type": 'text/html' });
//    console.log(`public${req.url}.html`);
    res.write(fs.readFileSync(`public${req.url}.html`));
    res.end();
}