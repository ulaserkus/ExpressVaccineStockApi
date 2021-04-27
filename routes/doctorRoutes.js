import express from 'express'
import DoctorController from '../Controller/doctorController.js'

const router = express.Router();


router.get('/', DoctorController.getDoctors)

router.get('/:id', DoctorController.getDoctorById)

router.post('/create', DoctorController.createDoctor)

router.get('/unit/:id', DoctorController.getDoctorsByUnitId)

router.get('/doctors/:id', DoctorController.getDoctorsByMinistaryId)

router.delete('/delete/:id', DoctorController.deleteDoctorById)

router.get('/doctorId/last', DoctorController.getLastDoctorId)




export default router


