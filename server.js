const express = require("express");
const path = require("path");
const forecast = require("./engine");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

app.post("/forecast", (req, res) => {
    const { population, demandPerPerson, years } = req.body;

    const result = forecast(population, demandPerPerson, years);

    res.json(result);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
