import dboperations from '../Data/patientdboperations.js'
import Patient from '../Models/Patient.js'


var getPatients = (req, res) => {

    dboperations.getPatients().then(result => {

        res.json(result[0])
    })
}



var getPatientById = (req, res) => {
    const { id } = req.params
    if (id) {
        dboperations.getPatientById(id).then(result => {

            res.json(result[0])
        })
    }


}
var getPatientsByUnitId = (req, res) => {
    const { id } = req.params
    if (id) {
        dboperations.getPatientsByUnitId(id).then(result => {

            res.json(result[0])
        })
    }


}
var getLastPatientId = (req, res) => {


    dboperations.getLastPatientId().then(result => {
        res.json(result[0])
    })

}
var getPatientAppointmentsById = (req, res) => {
    const { id } = req.params
    if (id) {
        dboperations.getPatientAppointmentsById(id).then(result => {

            res.json(result[0])
        })
    }


}

var getPatientsByDoctorId = (req, res) => {
    const { id } = req.params
    if (id) {
        dboperations.getPatientsByDoctorId(id).then(result => {

            res.json(result[0])
        })
    }


}


var createPatient = (req, res) => {

    if (req.body != null) {
        const { name, phone, address, age, vaccinated, cronic, img, unitid } = req.body

        let patient = new Patient(name, phone, address, age, vaccinated, cronic, unitid, img)

        dboperations.createPatient(patient).then(result => {

            res.sendStatus(200)
        })

    }
    else {
        res.sendStatus(400)
    }
}

var updatePatient = (req, res) => {

    if (req.body != null) {

        const { id } = req.params
        const { name, phone, address, age, vaccinated, cronic, img, unitid } = req.body

        let patient = new Patient(name, phone, address, age, vaccinated, cronic, unitid, img)

        dboperations.updatePatient(patient, id).then(result => {

            res.sendStatus(200)
        })

    }
    else {
        res.sendStatus(400)
    }
}

var deletePatientById = (req, res) => {

    const { id } = req.params

    dboperations.deletePatientById(id).then(result => {
        res.sendStatus(200)
    })

}



export default {
    getPatients: getPatients,
    getPatientById: getPatientById,
    getPatientAppointmentsById: getPatientAppointmentsById,
    getPatientsByDoctorId: getPatientsByDoctorId,
    createPatient: createPatient,
    getPatientsByUnitId: getPatientsByUnitId,
    updatePatient: updatePatient,
    deletePatientById:deletePatientById,
    getLastPatientId:getLastPatientId
   

}