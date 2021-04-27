import dboperations from '../Data/producerministarydboperations.js'



var getProducersByMinistaryId = (req, res) => {
    const { id } = req.params

    dboperations.getProducersByMinistaryId(id).then(result => {
        res.json(result[0])
    })

}

var createProducerMinistary = (req, res) => {
    const { ministaryid, producerid } = req.body

    let obj = {
        Ministary_Id: ministaryid,
        Producer_Id: producerid
    }

    dboperations.createProducerMinistary(obj).then(result => {
        res.sendStatus(200)
    })

}


var deleteProducerMinistary = (req, res) => {
    
    const { id } = req.params

    dboperations.deleteProducerMinistary(id).then(result => {
        res.sendStatus(200)
    })

}

export default {
    createProducerMinistary: createProducerMinistary,
    getProducersByMinistaryId: getProducersByMinistaryId,
    deleteProducerMinistary:deleteProducerMinistary
}