
const process = require("process");

const express = require("express");

const app = express();

const api = express.Router();

const cashMachine = require("./cash-machine");

api.use(express.json());

api.post("/calcular/:valor", (request, response) => {
    var valor = parseInt(request.params.valor);
    var notas = request.body;

    if (isNaN(valor) || valor < 1)
        return response.status(400).send({error: "Valor desejado inválido"}).end();
    if (!Array.isArray(notas))
        return response.status(400).send({error: "Body Request não é um Array válido"}).end();
    notas = notas.map(nota => parseInt(nota));
    if (notas.some(nota => isNaN(nota) || nota < 1))
        return response.status(400).send({error: "Uma ou mais itens do Array contem valor inválido"}).end();
    response.send(cashMachine.calcular(notas, valor)).end();
});

api.get("/hello", (request, response) => response.send("World"));

app.use("/api", api);

module.exports = {
    app: app,
    start(port, staticPath) {
        if (!port)
            port = process.env.HTTP_PORT ? parseInt(process.env.HTTP_PORT) : 8080;
        if (isNaN(port))
            port = 8080;
        if (staticPath)
            this.app.use(express.static(staticPath));
        this.app.listen(port);
    }
};
