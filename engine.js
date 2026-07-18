function forecast(population, demandPerPerson, years) {
    const growthRate = 0.02;
    let futurePopulation = population * Math.pow((1 + growthRate), years);
    let waterDemand = futurePopulation * demandPerPerson;

    return {
        futurePopulation: Math.round(futurePopulation),
        waterDemand: Math.round(waterDemand)
    };
}

module.exports = forecast;
