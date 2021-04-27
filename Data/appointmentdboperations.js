import sql from 'mssql'
import config from './config.js'

async function getAppointments() {

    try {
        let db = await sql.connect(config)
        let appointments = await db.request().query("select * from Doctor_Patient_Date_Table")
        return appointments.recordsets

    } catch (error) {

        console.log(error)

    }
}

async function getAllAppointmentsWithInfo() {
    try {
        let db = await sql.connect(config)
        let info = await db.request().query(`select Unit_Name,Unit_Adress,Unit_Phone,Doctor_FullName,Patient_FullName,Appointment_Date,Priority from Doctor_Patient_Date_Table as dp join Doctors_Table as dt on dt.Id=dp.Doctor_Id join Health_Units as hu on hu.Id=dt.Unit_Id join Patients_Table as pt on pt.Id=dp.Patient_Id`)
        return info.recordsets
    } catch (error) {
        console.log(error)
    }
}
async function getAppointmentByPatientId(Id) {
    try {
        let db = await sql.connect(config)
        let info = await db.request()
            .input('Id', sql.Int, Id)
            .query(`select Unit_Name,Unit_Adress,Unit_Phone,Doctor_FullName,Patient_FullName,Appointment_Date,Priority from Doctor_Patient_Date_Table as dp join Doctors_Table as dt on dt.Id=dp.Doctor_Id join Health_Units as hu on hu.Id=dt.Unit_Id join Patients_Table as pt on pt.Id=dp.Patient_Id where dp.Patient_Id=@Id`)
        return info.recordsets
    } catch (error) {
        console.log(error)
    }
}
async function getAppointmentsByDoctorId(id) {
    try {
        let db = await sql.connect(config)
        let info = await db.request()
            .input('id', sql.Int, id)
            .query(`select * from Doctor_Patient_Date_Table  inner join Patients_Table on Patients_Table.Id=Doctor_Patient_Date_Table.Patient_Id  where Doctor_Id=@id and HasVaccinated=0`)
        return info.recordsets
    } catch (error) {
        console.log(error)
    }
}

async function createAppointment(_App) {
    try {
        let db = await sql.connect(config)
        let info = await db.request()
            .input('doctorid', sql.Int, _App.Doctor_Id)
            .input('patientid', sql.Int, _App.Patient_Id)
            .input('date', sql.SmallDateTime, _App.Appointment_Date)
            .input('priority', sql.Int, _App.Priority)
            .query(`insert into Doctor_Patient_Date_Table values(@doctorid,@patientid,@date,@priority)`)
        return info.recordsets
    } catch (error) {
        console.log(error)
    }
}

async function createPhaseState(phase, doctorpatientid) {
    try {
        let db = await sql.connect(config)
        let info = await db.request()
            .input('doctorpatientid', sql.Int, doctorpatientid)
            .input('phase', sql.Int, phase)
            .query(`insert into Phase_Table values(@phase,@doctorpatientid)`)
        return info.recordsets
    } catch (error) {
        console.log(error)
    }
}

async function getLastAppointmentId() {
    try {
        let pool = await sql.connect(config)
        let doctors = await pool.request().query('select Top 1 Id from Doctor_Patient_Date_Table as d order by Id desc')
        return doctors.recordset

    } catch (err) {
        console.log(err)
    }
}

async function getPhaseOneAppointments(id) {
    try {
        let pool = await sql.connect(config)
        let doctors = await pool.request()
        .input('id',sql.Int,id)
        .query('select p.Id,ddt.Doctor_Id,p.Doctor_Patient_Id,dt.Doctor_FullName,hu.Unit_Name,hu.Unit_Adress,ddt.Appointment_Date,Patient_Id,pt.Patient_FullName,pt.Patient_Age,pt.Patient_Adress,pt.Patient_Phone,pt.HasVaccinated,pt.HasCronicPatient,ddt.Priority,pt.Image_Url,pt.Unit_Id  from  Phase_Table  as p join Doctor_Patient_Date_Table as ddt on ddt.Id=p.Doctor_Patient_Id join Doctors_Table as dt on dt.Id=ddt.Doctor_Id join Health_Units as hu on hu.Id=dt.Unit_Id join Patients_Table as pt on pt.Id=ddt.Patient_Id where Phase_Number=1 and ddt.Doctor_Id=@id')
        return doctors.recordsets

    } catch (err) {
        console.log(err)
    }
}
async function getPhaseTwoAppointments(id) {
    try {
        let pool = await sql.connect(config)
        let doctors = await pool.request()
        .input('id',sql.Int,id)
        .query('select p.Id,ddt.Doctor_Id,p.Doctor_Patient_Id,dt.Doctor_FullName,hu.Unit_Name,hu.Unit_Adress,ddt.Appointment_Date,Patient_Id,pt.Patient_FullName,pt.Patient_Age,pt.Patient_Adress,pt.Patient_Phone,pt.HasVaccinated,pt.HasCronicPatient,ddt.Priority,pt.Image_Url,pt.Unit_Id from  Phase_Table  as p join Doctor_Patient_Date_Table as ddt on ddt.Id=p.Doctor_Patient_Id join Doctors_Table as dt on dt.Id=ddt.Doctor_Id join Health_Units as hu on hu.Id=dt.Unit_Id join Patients_Table as pt on pt.Id=ddt.Patient_Id where Phase_Number=2 and ddt.Doctor_Id=@id')
        return doctors.recordsets

    } catch (err) {
        console.log(err)
    }
}
async function getPhaseExtraAppointments(id) {
    try {
        let pool = await sql.connect(config)
        let doctors = await pool.request()
        .input('id',sql.Int,id)
        .query('select p.Id,ddt.Doctor_Id,p.Doctor_Patient_Id,dt.Doctor_FullName,hu.Unit_Name,hu.Unit_Adress,ddt.Appointment_Date,Patient_Id,pt.Patient_FullName,pt.Patient_Age,pt.Patient_Adress,pt.Patient_Phone,pt.HasVaccinated,pt.HasCronicPatient,ddt.Priority,pt.Image_Url,pt.Unit_Id  from  Phase_Table  as p join Doctor_Patient_Date_Table as ddt on ddt.Id=p.Doctor_Patient_Id join Doctors_Table as dt on dt.Id=ddt.Doctor_Id join Health_Units as hu on hu.Id=dt.Unit_Id join Patients_Table as pt on pt.Id=ddt.Patient_Id where Phase_Number=3 and ddt.Doctor_Id=@id')
        return doctors.recordsets

    } catch (err) {
        console.log(err)
    }
}
async function updatePhaseState(id, phase, doctorpatientid) {
    try {
        let db = await sql.connect(config)
        let info = await db.request()
            .input('doctorpatientid', sql.Int, doctorpatientid)
            .input('phase', sql.Int, phase)
            .input('id', sql.Int, id)
            .query(`update  Phase_Table set Phase_Number=@phase,Doctor_Patient_Id=@doctorpatientid where Id=@id`)
        return info.recordsets
    } catch (error) {
        console.log(error)
    }
}

async function deletePhaseState(id) {
    try {
        let db = await sql.connect(config)
        let info = await db.request()
            .input('id', sql.Int, id)
            .query(`delete from Phase_Table where Id=@id`)
        return info.recordsets
    } catch (error) {
        console.log(error)
    }
}

async function GetPhaseStateByPatientId(id) {
    try {
        let db = await sql.connect(config)
        let info = await db.request()
            .input('id', sql.Int, id)
            .query(`select * from Phase_Table join Doctor_Patient_Date_Table on Doctor_Patient_Date_Table.Id=Phase_Table.Doctor_Patient_Id where Doctor_Patient_Date_Table.Patient_Id=@id`)
        return info.recordsets
    } catch (error) {
        console.log(error)
    }
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
    updatePhaseState: updatePhaseState,
    deletePhaseState:deletePhaseState,
    getPhaseTwoAppointments:getPhaseTwoAppointments,
    getPhaseExtraAppointments:getPhaseExtraAppointments,
    GetPhaseStateByPatientId:GetPhaseStateByPatientId
}