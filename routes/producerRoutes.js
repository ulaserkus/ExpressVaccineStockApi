import express from 'express'
import producerController from '../Controller/producerController.js'


const router = express.Router()

router.get('/:id',producerController.getProducers)

router.get('/last/id',producerController.getLastProducerId)

router.post('/create',producerController.createProducer)

router.delete('/delete/:id',producerController.deleteProducer)

router.get('/withstocks/:id',producerController.getProducersWithStocks)

router.get('/producer/:Id',producerController.getProducerById)


export default router