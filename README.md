# Gerenciador-de-eventos
Projeto Integrador da UNIVESP

---

Framework Webserver: Node.js + Express
Instalar: https://nodejs.org/pt-br/download

Necessario instalar: [Node, npm, mysql/mariadb]

1. Iniciar base de dados
```
cd "<diretório do projeto>"
mysql -u "<usuario mysql>" -p
"<senha mysql>"
source ./mysql_setup.sql
```

2. Para iniciar o servidor
```
cd "<diretório do projeto>"
<modifique credenciais de acesso ao mysql dentro do arquivo "webserver.js">
npm install
node webserver.js
```
