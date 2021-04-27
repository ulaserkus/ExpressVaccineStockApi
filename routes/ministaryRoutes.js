import express from 'express'
import MinistaryController from '../Controller/ministaryController.js'

const router = express.Router()


router.get('/',MinistaryController.getMinistary)

router.get('/:id',MinistaryController.getMinistaryById)

router.get('/ministaries/:id',MinistaryController.getMinistaryProducer)

router.post('/value/create',MinistaryController.createMinistary)

router.get('/percantage/list',MinistaryController.getMinistaryAndVaccineCount)

router.get('/id/last',MinistaryController.getLastMinistaryId)

router.patch('/update/:id',MinistaryController.updateMinistaryById)


export default router