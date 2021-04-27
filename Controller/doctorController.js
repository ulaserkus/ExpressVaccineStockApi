import dboperations from '../Data/doctordboperations.js'
import Doctor from '../Models/Doctor.js'



var getDoctors = (req, res) => {

    dboperations.getDoctors().then(result => {

        res.json(result[0])
    })

}
var getLastDoctorId = (req, res) => {

    dboperations.getLastDoctorId().then(result => {

        res.json(result[0])
    })

}
var getDoctorById = (req, res) => {
    const { id } = req.params

    if (id) {
        dboperations.getDoctorById(id).then(result => {

            res.json(result[0])
        })

    }

}

var getDoctorsByUnitId = (req, res) => {
    const { id } = req.params

    if (id) {
        dboperations.getDoctorsByUnitId(id).then(result => {

            res.json(result[0])
        })

    }

}
var getDoctorsByMinistaryId = (req, res) => {

    const { id } = req.params

    if (id) {
        dboperations.getDoctorsByMinistaryId(id).then(result => {

            res.json(result[0])
        })

    }

}

var createDoctor = (req, res) => {

    if (req.body.name != null) {

        let doctor = new Doctor(req.body.name, req.body.phone, req.body.adress, req.body.unitid, req.body.imageurl)

        dboperations.createDoctor(doctor).then(result => {

            res.send(`${doctor.Doctor_FullName} Adlı Doktor Kayıt Edildi`)


        })

    }

    if (req.body.name == null) {
        res.sendStatus(400)
    }

}
var deleteDoctorById = (req, res) => {

    const { id } = req.params

    dboperations.deleteDoctor(id).then(result => {

        res.sendStatus(200)


    })

}

export default {
    getDoctors: getDoctors,
    getLastDoctorId: getLastDoctorId,
    getDoctorById: getDoctorById,
    getDoctorsByUnitId, getDoctorsByUnitId,
    createDoctor: createDoctor,
    deleteDoctorById: deleteDoctorById,
    getDoctorsByMinistaryId: getDoctorsByMinistaryId
}