import express from 'express'
import producerMinistaryController from '../Controller/producerMinistaryController.js'


const router = express.Router()




router.post('/create',producerMinistaryController.createProducerMinistary)

router.get('/producers/:id',producerMinistaryController.getProducersByMinistaryId)

router.delete('/producer/:id',producerMinistaryController.deleteProducerMinistary)



export default router