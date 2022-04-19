function Person(height, weight) {
    if (typeof(height) !== 'number' || isNaN(height))
        throw Error('height not a number');

    if (typeof(weight) !== 'number' || isNaN(weight))
        throw Error('weight not a number');

    this.height = height;
    this.weight = weight;
}

function Dietician(height, weight, crn) {
    Person.call(this, height, weight);
    this.crn = crn;
    this.calculateImc = function() {
        return this.weight / Math.pow(this.height, 2);
    }
}
Dietician.prototype = Object.create(Person.prototype);
Dietician.prototype.constructor = Dietician;

function Athlete(height, weight, crn) {
    Dietician.call(this, height, weight, crn);
    this.calculateDiet = function() {
        var imc = this.calculateImc();
        if (imc > 30) {
            return "Ultra leve";
        } else {
            return "Normal";
        }
    }
}
Athlete.prototype = Object.create(Dietician);
Athlete.prototype.constructor = Athlete;


function calculateImc() {
    return function () {
        var dimensoes = new Builder();
        document.querySelector('#imc').innerHTML = new Dietician(dimensoes.altura, dimensoes.peso, 1234).calculateImc();
        document.querySelector('#diet').innerHTML = new Athlete(dimensoes.altura, dimensoes.peso, 1234).calculateDiet();
    }
}

function Builder() {
    var dimensoes = {
        altura: parseFloat(document.querySelector('#altura').value),
        peso: parseFloat(document.querySelector('#peso').value)
    }
    return dimensoes;
}

window.onload = function(evt) {
    var btn = document.querySelector(".form button");
    btn.addEventListener("click", calculateImc());
}
