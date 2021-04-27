import dboperations from '../Data/vaccinestockdboperations.js'
import Claim from '../Models/ClaimStock.js'
import Stock from '../Models/Stock.js'


var getVaccineStocks = (req, res) => {

    const { id } = req.params
    dboperations.getVaccineStocks(id).then(result => {
        res.json(result[0])
    })
}

var getClaimStocks = (req, res) => {

    const { id } = req.params
    dboperations.getClaimStocks(id).then(result => {
        res.json(result[0])
    })
}

var getVaccineStocksProducerAndCount = (req, res) => {

    dboperations.getVaccineStocksProducerAndCount().then(result => {
        res.json(result[0])
    })
}
var getVaccineStocksByMinistary = (req, res) => {
    const { id } = req.params
    dboperations.getVaccineStocksByMinistary(id).then(result => {
        res.json(result[0])
    })
}
var createStock = (req, res) => {
    const { name, count, date, producerid, img } = req.body
    let stock = new Stock(name, count, date, producerid, img)

    dboperations.createStock(stock).then(result => {
        res.sendStatus(200)
    })
}

var createClaimStock = (req, res) => {
    const { count, date, producerid, ministaryid } = req.body
    let claim = new Claim(ministaryid, producerid,count,date)

    dboperations.createClaimStock(claim).then(result => {
        res.sendStatus(200)
    })
}

var createMinistaryStock = (req, res) => {

    const { ministaryid, stockid ,count} = req.body


    dboperations.createMinistaryStock(ministaryid, stockid,count).then(result => {
        res.sendStatus(200)
    })
}

var updateStock = (req, res) => {

    const { id } = req.params 

    const { name, count, date, producerid, img } = req.body

    let stock = new Stock(name, count, date, producerid, img)

    dboperations.UpdateStockById(stock, id).then(result => {
        res.sendStatus(200)
    })
}


var UpdateClaimStockById = (req, res) => {

    const { id } = req.params

    const { ministaryid,stockid,count } = req.body

    dboperations.UpdateClaimStockById(id,ministaryid,stockid,count).then(result => {
        res.sendStatus(200)
    })
}

var deleteClaimStock = (req, res) => {

    const { id } = req.params


    dboperations.deleteClaimStock(id).then(result => {
        res.sendStatus(200)
    })
}

export default {
    getVaccineStocks: getVaccineStocks,
    createStock: createStock,
    updateStock: updateStock,
    createMinistaryStock: createMinistaryStock,
    getVaccineStocksByMinistary:getVaccineStocksByMinistary,
    getVaccineStocksProducerAndCount:getVaccineStocksProducerAndCount,
    createClaimStock:createClaimStock,
    getClaimStocks:getClaimStocks,
    deleteClaimStock:deleteClaimStock,
    UpdateClaimStockById:UpdateClaimStockById
}