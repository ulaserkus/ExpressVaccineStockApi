import config from './config.js'
import sql from 'mssql'



async function getPatients() {
    try {
        let pool = await sql.connect(config)
        let patients = await pool.request().query('select * from Patients_Table')
        return patients.recordsets

    } catch (error) {
        console.log(error)
    }
}
async function getPatientById(id) {
    try {
        let pool = await sql.connect(config)
        let patients = await pool.request()
            .input("id", sql.Int, id)
            .query(`select Patients_Table.Id,Patient_FullName,Patient_Phone,Patient_Adress,Patient_Age,HasVaccinated,HasCronicPatient,Patients_Table.Unit_Id,Patients_Table.Image_Url,Ministary_Id  from Patients_Table join Health_Units on Health_Units.Id=Patients_Table.Unit_Id where Patients_Table.Id=@id`)
        return patients.recordset

    } catch (error) {
        console.log(error)
    }
}



async function getPatientsByUnitId(id) {
    try {
        let pool = await sql.connect(config)
        let patients = await pool.request()
            .input("id", sql.Int, id)
            .query(`select * from Patients_Table where Unit_Id=@id`)
        return patients.recordsets

    } catch (error) {
        console.log(error)
    }
}


async function getPatientsByDoctorId(id) {
    try {
        let pool = await sql.connect(config)
        let patients = await pool.request()
            .input("id", sql.Int, id)
            .query(`select Patient_Id,Patient_FullName,Patient_Age,Patient_Phone,Patient_Adress,HasVaccinated,HasCronicPatient,Patients_Table.Image_Url,Patients_Table.Unit_Id from Doctor_Patient_Date_Table join Doctors_Table on Doctors_Table.Id=Doctor_Patient_Date_Table.Doctor_Id join Patients_Table on Patients_Table.Id=Doctor_Patient_Date_Table.Patient_Id  where Doctor_Id=@id and Patients_Table.HasVaccinated=0 order by Doctor_Patient_Date_Table.Appointment_Date,Doctor_Patient_Date_Table.Priority`)
        return patients.recordsets

    } catch (error) {
        console.log(error)
    }
}

async function getPatientAppointmentsById(id) {
    try {
        let pool = await sql.connect(config)
        let patients = await pool.request()
            .input("id", sql.Int, id)
            .query(`select Doctor_FullName,Unit_Name,Unit_Adress,Appointment_Date from Doctor_Patient_Date_Table join Doctors_Table on Doctors_Table.Id =Doctor_Patient_Date_Table.Doctor_Id join Health_Units on Health_Units.Id=Doctors_Table.Unit_Id where Patient_Id=@id order by Priority`)
        return patients.recordsets

    } catch (error) {
        console.log(error)
    }
}

async function createPatient(_Patient) {
    try {
        let pool = await sql.connect(config)
        let patients = await pool.request()
            .input("name", sql.NVarChar, _Patient.FullName)
            .input("phone", sql.NVarChar, _Patient.Phone)
            .input("adress", sql.NVarChar, _Patient.Adress)
            .input("age", sql.TinyInt, _Patient.Age)
            .input("hasvaccinated", sql.Bit, _Patient.HasVaccinated)
            .input("hascronicpatient", sql.Bit, _Patient.HasCronicPatient)
            .input("unitid", sql.Int, _Patient.Unit_Id)
            .input("img", sql.NVarChar, _Patient.Image_Url)
            .query('insert into Patients_Table values(@name,@phone,@adress,@age,@hasvaccinated,@hascronicpatient,@img,@unitid)')

        return patients.recordsets

    } catch (error) {

        console.log(error)

    }
}

async function updatePatient(_Patient, id) {
    try {
        let pool = await sql.connect(config)
        let patients = await pool.request()
            .input("name", sql.NVarChar, _Patient.FullName)
            .input("phone", sql.NVarChar, _Patient.Phone)
            .input("adress", sql.NVarChar, _Patient.Adress)
            .input("age", sql.TinyInt, _Patient.Age)
            .input("hasvaccinated", sql.Bit, _Patient.HasVaccinated)
            .input("hascronicpatient", sql.Bit, _Patient.HasCronicPatient)
            .input("unitid", sql.Int, _Patient.Unit_Id)
            .input("img", sql.NVarChar, _Patient.Image_Url)
            .input("id", sql.Int, id)
            .query('update Patients_Table set Patient_FullName=@name,Patient_Age=@age,Patient_Phone=@phone,Patient_Adress=@adress,HasVaccinated=@hasvaccinated,HasCronicPatient=@hascronicpatient,Unit_Id=@unitid,Image_Url=@img where Id=@id')

        return patients.recordsets

    } catch (error) {

        console.log(error)

    }
}


async function deletePatientById(id) {

    try {
        let db = await sql.connect(config)
        let unitData = await db.request()
            .input("id", sql.Int, id)
            .query(`
            alter table Patients_Table nocheck constraint all
            alter table Users nocheck constraint all
            alter table Doctor_Patient_Date_Table nocheck constraint all
            DELETE FROM Users WHERE Users.Patient_Id=@id
            DELETE FROM Patients_Table WHERE Patients_Table.Id=@id
            DELETE FROM Doctor_Patient_Date_Table WHERE Doctor_Patient_Date_Table.Patient_Id=@id
            alter table Doctor_Patient_Date_Table check constraint all
            alter table Users check constraint all
            alter table Patients_Table check constraint all`)

        return unitData.recordset

    } catch (error) {
        console.log(error)
    }
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
    

}