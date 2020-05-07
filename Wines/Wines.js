const glob = require('glob');
const fs = require('fs');
var _ = require('underscore');

class Wines {

    wines = [];

    constructor() {
        /*
            Just for demonstration purposes, 
            probably need to use Mongo DB instead
        */
        glob('wines/samples/*.json', (err, files) => {
            if (err) {
                console.log('Cannot read samples folder', err);
                return;
            }
            files.forEach(file => {
                fs.readFile(file, 'utf8', (err, data) => { 
                    if (err) {
                        console.log(`cannot read json file ${file}`, err);
                    }
                    this.wines.push(JSON.parse(data));
                });
            });
        });
    }

    updateLot(body) {
        const lot = this.wines.filter(w => {return w.lotCode === body.lotCode});
        const newLot = { ...lot, ...body};
        this.wines = [...this.wines.filter(w => {return w.lotCode !== body.lotCode}), newLot];
    }

    getLot(lotCode) {
        const lots = this.wines.filter(w => {return w.lotCode === lotCode});
        return (lots && lots.length > 0) ? lots[0] : null;
    }

    getAllLotCodes() {
        return this.wines.map(lot => lot.lotCode);
    }

    getBreakdownBy(lotCode, keys) {
        const result = [];
        const lot = this.getLot(lotCode);
        if (!lot || !lot.components || lot.components.length == 0) {
            return result;
        }
        const byKey = _.groupBy(lot.components, component => keys.map(k => component[k]).join(' '));
        for (const keyVal in byKey) {
            const percentage = byKey[keyVal].map(c => c.percentage).reduce((p1, p2) => (p1 + p2));
            result.push({key: keyVal, percentage});
        }
        result.sort((a, b) => (b.percentage - a.percentage));
        return result;
    }

    print(byKey) {
        return byKey.map(el => (el.percentage + '% - ' + el.key)).join('\r\n');
    }

    getYearBreakdown(lotCode) {
        return this.getBreakdownBy(lotCode, ['year']);
    }

    printYearBreakdown(lotCode) {
        return this.print(this.getBreakdownBy(lotCode, ['year']));
    }

    getVarietyBreakdown(lotCode) {
        return this.getBreakdownBy(lotCode, ['variety']);
    }

    printVarietyBreakdown(lotCode) {
        return this.print(this.getBreakdownBy(lotCode, ['variety']));
    }

    getRegionBreakdown(lotCode) {
        return this.getBreakdownBy(lotCode, ['region']);
    }

    printRegionBreakdown(lotCode) {
        return this.print(this.getBreakdownBy(lotCode, ['region']));
    }

    getYearAndVarietyBreakdown(lotCode) {
        return this.getBreakdownBy(lotCode, ['year', 'variety']);
    }

    printYearAndVarietyBreakdown(lotCode) {
        return this.print(this.getBreakdownBy(lotCode, ['year', 'variety']));
    }
}

module.exports = Wines;