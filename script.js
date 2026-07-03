function calculate() {

    let population = Number(document.getElementById("population").value);
    let demand = Number(document.getElementById("demand").value);
    let years = Number(document.getElementById("years").value);

    if (population === 0 || demand === 0 || years === 0) {
        alert("Please enter all values");
        return;
    }

    let growthRate = 0.02;

    let futurePopulation = population * Math.pow(1 + growthRate, years);

    let waterDemand = futurePopulation * demand;

    document.getElementById("result").innerHTML =
        "Future Population : " + Math.round(futurePopulation) +
        "<br><br>Estimated Water Demand : " +
        Math.round(waterDemand) + " Litres";
}