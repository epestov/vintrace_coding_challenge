const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const Wines = require('./wines/Wines');
const wines = new Wines();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT");
    next();
});

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get('/api/getYearBreakdown/:lotCode', (req, res) => {
    res.json(wines.getYearBreakdown(req.params.lotCode));
});

app.get('/api/printYearBreakdown/:lotCode', (req, res) => {
    res.send(wines.printYearBreakdown(req.params.lotCode));
});

app.get('/api/getVarietyBreakdown/:lotCode', (req, res) => {
    res.json(wines.getVarietyBreakdown(req.params.lotCode));
});

app.get('/api/printVarietyBreakdown/:lotCode', (req, res) => {
    res.send(wines.printVarietyBreakdown(req.params.lotCode));
});

app.get('/api/getRegionBreakdown/:lotCode', (req, res) => {
    res.json(wines.getRegionBreakdown(req.params.lotCode));
});

app.get('/api/printRegionBreakdown/:lotCode', (req, res) => {
    res.send(wines.printRegionBreakdown(req.params.lotCode));
});

app.get('/api/getYearAndVarietyBreakdown/:lotCode', (req, res) => {
    res.json(wines.getYearAndVarietyBreakdown(req.params.lotCode));
});

app.get('/api/printYearAndVarietyBreakdown/:lotCode', (req, res) => {
    res.send(wines.printYearAndVarietyBreakdown(req.params.lotCode));
});

app.get('/api/getAllLotCodes', (req, res) => {
    res.json(wines.getAllLotCodes());
})

app.get('/api/getLot/:lotCode', (req, res) => {
    const lot = wines.getLot(req.params.lotCode);
    if (lot) {
        res.json(lot);
    } else {
        res.status(400).json(`No lot with code ${req.params.lotCode} found`);
    }
});

app.put('/api/updateLot', (req, res) => {
    res.json(wines.updateLot(req.body));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));