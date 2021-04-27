import dboperations from '../Data/appointmentdboperations.js'
import Appointment from '../Models/Appointment.js'

var getAppointments = (req, res) => {
    dboperations.getAppointments().then(result => {
        res.json(result[0])
    })
}

var getAllAppointmentsWithInfo = (req, res) => {
    dboperations.getAllAppointmentsWithInfo().then(result => {
        res.json(result[0])
    })
}


var getAppointmentByPatientId = (req, res) => {

    const { id } = req.params
    if (id !== null) {

        dboperations.getAppointmentByPatientId(id).then(result => {
            res.json(result[0])
        })
    }

}

var getAppointmentsByDoctorId = (req, res) => {

    const { id } = req.params
    if (id !== null) {

        dboperations.getAppointmentsByDoctorId(id).then(result => {
            res.json(result[0])
        })
    }

}

var createAppointment = (req, res) => {

    let appointment = new Appointment()

    appointment = {

        Doctor_Id: req.body.doctorid,

        Patient_Id: req.body.patientid,

        Appointment_Date: req.body.date,

        Priority: req.body.priority

    }

    if (appointment !== null) {

        dboperations.createAppointment(appointment).then(result => {
            res.sendStatus(200)
        })
    }
    else {
        res.sendStatus(400)
    }


}

var createPhaseState = (req, res) => {

    const { phase, doctorpatientid } = req.body

    dboperations.createPhaseState(phase, doctorpatientid).then(result => {
        res.sendStatus(200)
    })


}

var updatePhaseState = (req, res) => {
    const { id } = req.params
    const { phase, doctorpatientid } = req.body

    dboperations.updatePhaseState(id,phase, doctorpatientid).then(result => {
        res.sendStatus(200)
    })


}
var deletePhaseState = (req, res) => {
    const { id } = req.params

    dboperations.deletePhaseState(id).then(result => {
        res.sendStatus(200)
    })


}

var getLastAppointmentId = (req, res) => {


    dboperations.getLastAppointmentId().then(result => {
        res.json(result[0])
    })

}

var getPhaseOneAppointments = (req, res) => {

    const { id } = req.params
    dboperations.getPhaseOneAppointments(id).then(result => {
        res.json(result[0])
    })

}

var getPhaseTwoAppointments = (req, res) => {

    const { id } = req.params
    dboperations.getPhaseTwoAppointments(id).then(result => {
        res.json(result[0])
    })

}

var getPhaseExtraAppointments = (req, res) => {

    const { id } = req.params
    dboperations.getPhaseExtraAppointments(id).then(result => {
        res.json(result[0])
    })

}

var GetPhaseStateByPatientId = (req, res) => {
    const { id } = req.params

    dboperations.GetPhaseStateByPatientId(id).then(result => {
        res.json(result[0])
    })


}





export default {
    getAppointments: getAppointments,
    getAllAppointmentsWithInfo: getAllAppointmentsWithInfo,
    getAppointmentByPatientId: getAppointmentByPatientId,
    createAppointment: createAppointment,
    getAppointmentsByDoctorId: getAppointmentsByDoctorId,
    createPhaseState: createPhaseState,
    getLastAppointmentId: getLastAppointmentId,
    getPhaseOneAppointments: getPhaseOneAppointments,
    updatePhaseState:updatePhaseState,
    deletePhaseState:deletePhaseState,
    getPhaseTwoAppointments:getPhaseTwoAppointments,
    getPhaseExtraAppointments:getPhaseExtraAppointments,
    GetPhaseStateByPatientId:GetPhaseStateByPatientId
}