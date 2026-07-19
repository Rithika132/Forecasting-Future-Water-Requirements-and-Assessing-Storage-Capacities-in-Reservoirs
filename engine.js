function forecast(population, demandPerPerson, years) {
    const growthRate = 0.02; // 2% population growth
    
    let futurePopulation = population * Math.pow((1 + growthRate), years);
    let estimatedDemand = futurePopulation * demandPerPerson;
    
    return {
        futurePopulation: Math.round(futurePopulation),
        estimatedDemand: Math.round(estimatedDemand)
    };
}

module.exports = forecast;