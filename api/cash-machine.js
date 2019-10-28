
module.exports = {
    calcular(notas, valor) {
        var calcRecurse = function(notas, valor) {
            for (var i = 0; i < notas.length; i++)
            {
                var resultado = [notas[i]];
                var novoValor = valor - notas[i];

                if (!novoValor)
                    return resultado;
                if (novoValor > 0)
                {
                    var resultadoRecurse = calcRecurse(notas.slice(i), novoValor);

                    if (Array.isArray(resultadoRecurse) && !resultadoRecurse.reduce((resultadoValor, valor) => resultadoValor - valor, novoValor))
                        return resultado.concat(resultadoRecurse);
                }
            }
            return null;
        };
        var result = calcRecurse(notas.sort((a, b) => b - a), valor);
        if (result == null)
            return result;
        result = result.reduce((objResult, nota) => {
            if (objResult[nota])
                objResult[nota]++;
            else
                objResult[nota] = 1;
            return objResult;
        }, {});
        return Object.keys(result).map(nota => { return {nota: parseInt(nota), quantidade: result[nota]}; });
    }
};
