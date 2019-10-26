
module.exports = {
    calcular(notas, valor) {
        var somaNotas;
        var listaNotas = [];
        do {
            listaNotas.push(notas[Math.floor(Math.random()*notas.length)]);
            somaNotas = listaNotas.reduce((valorTotal, valorNota) => valorTotal + valorNota);
            if (somaNotas > valor)
                listaNotas.splice(0, 1);
        } while (somaNotas != valor);
        var objNotas = listaNotas.reduce((objNotas, valorNota) => {
            objNotas[valorNota] = typeof objNotas[valorNota] == "undefined" ? 1 : objNotas[valorNota] + 1;
            return objNotas;
        }, {});
        return Object.keys(objNotas).map(objKey => {return {nota: objKey, quantidade: objNotas[objKey]}; });
    }
};
