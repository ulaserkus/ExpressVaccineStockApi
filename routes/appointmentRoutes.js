import express from 'express'
import appointmentController from '../Controller/appointmentController.js'

const router = express.Router()

router.get('/', appointmentController.getAppointments)

router.get('/infos', appointmentController.getAllAppointmentsWithInfo)

router.get('/last', appointmentController.getLastAppointmentId)

router.get('/phaseone/:id', appointmentController.getPhaseOneAppointments)

router.get('/phasetwo/:id', appointmentController.getPhaseTwoAppointments)

router.get('/phaseextra/:id', appointmentController.getPhaseExtraAppointments)

router.get('/phase/:id', appointmentController.GetPhaseStateByPatientId)

router.get('/infos/:id', appointmentController.getAppointmentByPatientId)

router.get('/infos/doctor/:id', appointmentController.getAppointmentsByDoctorId)

router.delete('/delete/:id',appointmentController.deletePhaseState)

router.post('/create', appointmentController.createAppointment)

router.post('/createphase', appointmentController.createPhaseState)


export default router