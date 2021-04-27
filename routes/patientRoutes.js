import express from 'express'
import PatientController from '../Controller/patientController.js'



const router = express.Router()

router.get('/',PatientController.getPatients)

router.get('/last',PatientController.getLastPatientId)

router.get('/:id',PatientController.getPatientById)

router.get('/appointment/:id',PatientController.getPatientAppointmentsById)

router.get('/doctor/:id',PatientController.getPatientsByDoctorId)

router.get('/patients/:id',PatientController.getPatientsByUnitId)

router.patch('/update/:id',PatientController.updatePatient)

router.delete('/delete/:id',PatientController.deletePatientById)

router.post('/create',PatientController.createPatient)


export default router



