import express from 'express'
import UnitController from '../Controller/healthUnitsController.js'

const router = express.Router()


router.get('/',UnitController.getHealthUnits)

router.get('/last',UnitController.getLastHealthUnitId)

router.get('/lastpatient',UnitController.getLastPatientId)

router.get('/:id',UnitController.getHealthUnitsByMinistaryId)

router.get('/report/:id',UnitController.getHealthUnitsReportByMinistaryId)

router.get('/unit/:id',UnitController.getHealthUnitById)

router.get('/doctorunit/:id',UnitController.getHealthUnitByDoctorId)

router.get('/unit/reports/:id',UnitController.getHealthUnitReportsById)

router.delete('/unit/delete/:id',UnitController.deleteHealthUnitById)

router.delete('/report/delete/:id',UnitController.deleteHealthUnitReportById)

router.post('/create',UnitController.createHealthUnit)

router.post('/createreport',UnitController.createHealthUnitReport)

router.patch('/update/:id',UnitController.updateHealthUnit)


router.post('/createuser',UnitController.createUser)


export default router