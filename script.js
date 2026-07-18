function calculate() {

    const population = Number(document.getElementById("population").value);
    const demandPerPerson = Number(document.getElementById("demand").value);
    const years = Number(document.getElementById("years").value);

    if (!population || !demandPerPerson || !years) {
        document.getElementById("result").innerHTML = "Please enter all values.";
        return;
    }

    const growthRate = 0.02; // 2% population growth

    const futurePopulation = Math.round(
        population * Math.pow((1 + growthRate), years)
    );

    const waterDemand = futurePopulation * demandPerPerson;

    document.getElementById("result").innerHTML =
        "<b>Future Population:</b> " + futurePopulation +
        "<br><b>Estimated Water Demand:</b> " + waterDemand + " Litres/day";
}