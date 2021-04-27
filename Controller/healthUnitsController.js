import dboperation from '../Data/healthunitsdboperations.js'
import HealthUnit from '../Models/HealthUnit.js'
import User from '../Models/User.js'
import Report from '../Models/Report.js'



var getHealthUnits = (req, res) => {

    dboperation.getHealthUnits().then(result => {
        res.json(result[0])
    })
}
var getHealthUnitById = (req, res) => {
    const { id } = req.params
    if (id) {
        dboperation.getHealthUnitById(id).then(result => {
            res.json(result[0])
        })
    }

}

var getHealthUnitsByMinistaryId = (req, res) => {
    const { id } = req.params
    if (id) {
        dboperation.getHealthUnitsByMinistaryId(id).then(result => {
            res.json(result[0])
        })
    }

}
var getHealthUnitByDoctorId = (req, res) => {
    const { id } = req.params
    if (id) {
        dboperation.getHealthUnitByDoctorId(id).then(result => {
            res.json(result[0])
        })
    }

}

var getHealthUnitReportsById = (req, res) => {
    const { id } = req.params
    if (id) {
        dboperation.getHealthUnitReportsById(id).then(result => {
            res.json(result[0])
        })
    }

}
var getLastHealthUnitId = (req, res) => {


    dboperation.getLastHealthUnitId().then(result => {
        res.json(result[0])
    })

}

var getLastPatientId = (req, res) => {


    dboperation.getLastPatientId().then(result => {
        res.json(result[0])
    })

}

var getHealthUnitsReportByMinistaryId = (req, res) => {
    const { id } = req.params
    if (id) {
        dboperation.getHealthUnitsReportByMinistaryId(id).then(result => {
            res.json(result[0])
        })
    }

}

var createHealthUnit = (req, res) => {

    const { name, adress, phone, ministaryid, image_url } = req.body

    let unit = new HealthUnit(name, adress, phone, ministaryid, image_url)


    dboperation.createHealthUnit(unit).then(result => {

        res.send("rapor kayıt edildi").sendStatus(200)

    })

    if (req.body == null) {
        res.sendStatus(400)
    }

}
var createHealthUnitReport = (req, res) => {

    const { count, need, date, unitid } = req.body

    let report = new Report(count, need, date, unitid)


    dboperation.createHealthUnitReport(report).then(result => {

        res.sendStatus(200)

    })

    if (req.body == null) {
        res.sendStatus(400)
    }

}
var updateHealthUnit = (req, res) => {

    const { id } = req.params
    const { name, adress, phone, ministaryid, image_url } = req.body

    let unit = new HealthUnit(name, adress, phone, ministaryid, image_url)


    dboperation.updateHealthUnit(unit, id).then(result => {

        res.sendStatus(200)

    })

    if (req.body == null) {
        res.sendStatus(400)
    }

}

var createUser = (req, res) => {

    const { username, password, role, ministary_id, patient_id, doctor_id, unit_id,producer_id } = req.body
    let user = new User(username, password, role, ministary_id, patient_id, doctor_id, unit_id,producer_id)
    console.log(user)

    dboperation.createUser(user).then(result => {
        res.send("kullanıcı kayıt edildi")
    })


}
var deleteHealthUnitById = (req, res) => {
    const { id } = req.params

    if (id) {
        dboperation.deleteHealthUnitById(id).then(result => {
            res.send("birimin tüm verileri silindi")
        })
    }

}

var deleteHealthUnitReportById = (req, res) => {
    const { id } = req.params

    if (id) {
        dboperation.deleteHealthUnitReportById(id).then(result => {
            res.sendStatus(200)
        })
    }

}


export default {
    getHealthUnits: getHealthUnits,
    getHealthUnitById: getHealthUnitById,
    getHealthUnitByDoctorId: getHealthUnitByDoctorId,
    createHealthUnit: createHealthUnit,
    getHealthUnitsByMinistaryId: getHealthUnitsByMinistaryId,
    getHealthUnitReportsById: getHealthUnitReportsById,
    getHealthUnitsReportByMinistaryId: getHealthUnitsReportByMinistaryId,
    getLastHealthUnitId: getLastHealthUnitId,
    createUser: createUser,
    deleteHealthUnitById: deleteHealthUnitById,
    updateHealthUnit: updateHealthUnit,
    createHealthUnitReport:createHealthUnitReport,
    deleteHealthUnitReportById:deleteHealthUnitReportById,
    getLastPatientId:getLastPatientId
}