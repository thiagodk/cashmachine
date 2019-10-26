
angular.module("cashMachine", []).controller("cashMachineUI", function($scope, $http) {
    this.notas = [];
    this.removerNova = function(idx) {
        this.notas.splice(idx, 1);
    };
    this.adicionarNovaNota = function() {
        this.notas.push(this.novaNota);
        delete this.novaNota;
    };
    this.calcularValor = function() {
        if (!$scope.formCalcularNotas.$valid)
            return false;
        $http.post("api/calcular/" + this.valor, this.notas).then(function(response) {
            if (Array.isArray(response.data))
                this.resultado = response.data;
        }.bind(this));
    };
});
