import dboperation from '../Data/ministarydboperations.js'
import Ministary from '../Models/Ministary.js'


var getMinistary = (req, res) => {

    dboperation.getMinistary().then(result => {
        res.json(result[0])
    })
}

var getMinistaryAndVaccineCount = (req, res) => {

    dboperation.getMinistaryAndVaccineCount().then(result => {
        res.json(result[0])
    })
}


var getMinistaryProducer = (req, res) => {
    const{id}=req.params
    dboperation.getMinistaryProducer(id).then(result => {
        res.json(result[0])
    })
}

var getLastMinistaryId = (req, res) => {

    dboperation.getLastMinistaryId().then(result => {
        res.json(result[0])
    })
}

var getMinistaryById = (req, res) => {
    const { id } = req.params


    dboperation.getMinistaryById(id).then(result => {
        res.json(result[0])
    })


}

var updateMinistaryById = (req, res) => {

    const { id } = req.params

    const { name, need, total, img, lastdate, lastcount } = req.body

    const ministary = new Ministary(name, need, lastdate, lastcount, total, img)

    dboperation.UpdateMinistaryById(ministary, id).then(result => {
        res.send(`${name} Güncellendi`)
    })



}

var createMinistary = (req, res) => {



    const { name, need, total, img, lastdate, lastcount } = req.body

    const ministary = new Ministary(name, need, lastdate, lastcount, total, img)

    dboperation.CreateMinistaryById(ministary).then(result => {
        res.sendStatus(200)
    })



}



export default {
    getMinistary: getMinistary,
    getMinistaryById: getMinistaryById,
    updateMinistaryById: updateMinistaryById,
    getLastMinistaryId: getLastMinistaryId,
    createMinistary:createMinistary,
    getMinistaryProducer:getMinistaryProducer,
    getMinistaryAndVaccineCount:getMinistaryAndVaccineCount
}