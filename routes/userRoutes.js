import express from 'express'
import UserController from '../Controller/userController.js'

const router = express.Router()


router.get('/', UserController.getUsers)

router.get('/doctors/:id', UserController.getDoctorUsersByMinistaryId)

router.delete('/delete/:id', UserController.deleteUserById)

router.get('/units/:id', UserController.getUnitUsersByMinistaryId)

router.get('/noregistered/doctors/:id', UserController.getNotRegisteredDoctorByMinistaryId)

router.get('/noregistered/units/:id', UserController.getNotRegisteredUnitsByMinistaryId)

router.get('/noregistered/patients/:id', UserController.getNotRegisteredPatientsByUnitId)

router.post('/login', UserController.userLogin)





export default router

