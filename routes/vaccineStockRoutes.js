import express from 'express'
import StockController from '../Controller/vaccineStockController.js'


const router = express.Router()



router.get('/count',StockController.getVaccineStocksProducerAndCount)

router.get('/stocks/:id',StockController.getVaccineStocks)

router.get('/claims/:id',StockController.getClaimStocks)

router.get('/ministary/:id',StockController.getVaccineStocksByMinistary)

router.post('/create',StockController.createStock)

router.post('/createclaim',StockController.createClaimStock)

router.post('/createministarystock',StockController.createMinistaryStock)

router.patch('/update/:id',StockController.updateStock)

router.patch('/updateclaim/:id',StockController.UpdateClaimStockById)

router.delete('/deleteclaim/:id',StockController.deleteClaimStock)


export default router



