async function calculate() {

    const population = Number(document.getElementById("population").value);
    const demandPerPerson = Number(document.getElementById("demand").value);
    const years = Number(document.getElementById("years").value);

    const response = await fetch("/forecast", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            population,
            demandPerPerson,
            years
        })
    });

    const data = await response.json();

    document.getElementById("result").innerHTML =
        "Future Population: " + data.futurePopulation +
        "<br>Water Demand: " + data.waterDemand + " Litres";
}
