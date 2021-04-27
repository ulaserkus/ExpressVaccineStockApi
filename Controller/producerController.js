import dboperations from '../Data/producerdboperations.js'
import Producer from '../Models/Producer.js'



var getProducers = (req, res) => {
     
    const{id}=req.params
    dboperations.getProducers(id).then(result => {
        res.json(result[0])
    })
}

var getLastProducerId = (req, res) => {

    dboperations.getLastProducerId().then(result => {
        res.json(result[0])
    })
}

var getProducerById = (req, res) => {

    const { Id } = req.params

    dboperations.getProducerById(Id).then(result => {
        res.json(result[0])
    })
}

var getProducersWithStocks = (req, res) => {

    const { id } = req.params

    dboperations.getProducersWithStocks(id).then(result => {
        res.json(result[0])
    })
}

var createProducer = (req, res) => {
    const { name, country, email, phone, address, ministaryid,img } = req.body

    let producer = new Producer(name, country, email, phone, address, ministaryid,img)

    dboperations.createProducer(producer).then(result => {
        res.sendStatus(200)
    })

}

var deleteProducer = (req, res) => {
    const { id } = req.params
    dboperations.deleteProducer(id).then(result => {
        res.sendStatus(200)
    })

}



export default {
    getProducers: getProducers,
    getProducersWithStocks, getProducersWithStocks,
    createProducer:createProducer,
    deleteProducer:deleteProducer,
    getProducerById:getProducerById,
    getLastProducerId:getLastProducerId
}