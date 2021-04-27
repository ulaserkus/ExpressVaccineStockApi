import config from './config.js'
import sql from 'mssql'

async function getDoctors() {
    try {
        let pool = await sql.connect(config)
        let doctors = await pool.request().query('select * from Doctors_Table')
        return doctors.recordsets

    } catch (err) {
        console.log(err)
    }
}

async function getLastDoctorId() {
    try {
        let pool = await sql.connect(config)
        let doctors = await pool.request().query('select Top 1 Id from Doctors_Table as d order by Id desc')
        return doctors.recordset

    } catch (err) {
        console.log(err)
    }
}
async function getDoctorById(id) {
    try {
        let pool = await sql.connect(config)
        let doctors = await pool.request()
            .input("id", sql.Int, id)
            .query('select * from Doctors_Table where Id = @id')
        return doctors.recordset

    } catch (err) {
        console.log(err)
    }
}
async function getDoctorsByMinistaryId(id) {
    try {
        let pool = await sql.connect(config)
        let doctors = await pool.request()
            .input("id", sql.Int, id)
            .query('select Doctors_Table.Id,Doctor_FullName,Doctor_Phone,Doctor_Adress,Doctors_Table.Unit_Id,Doctors_Table.Image_Url from Doctors_Table join Health_Units on Health_Units.Id=Doctors_Table.Unit_Id where Health_Units.Ministary_Id=@id')
        return doctors.recordsets

    } catch (err) {
        console.log(err)
    }
}
async function getDoctorsByUnitId(id) {
    try {
        let pool = await sql.connect(config)
        let doctors = await pool.request()
            .input("id", sql.Int, id)
            .query('select * from Doctors_Table where Unit_Id=@id')
        return doctors.recordsets

    } catch (err) {
        console.log(err)
    }
}



async function createDoctor(_doctor) {

    try {
        let conn = await sql.connect(config)
        let doctor = await conn.request()
            .input('name', sql.NVarChar, _doctor.Doctor_FullName)
            .input('phone', sql.NVarChar, _doctor.Doctor_Phone)
            .input('adress', sql.NVarChar, _doctor.Doctor_Adress)
            .input('unitid', sql.Int, _doctor.Unit_Id)
            .input('img', sql.NVarChar, _doctor.Image_Url)
            .query("insert into Doctors_Table values(@name,@phone,@adress,@unitid,@img)")

        return doctor.recordsets

    } catch (error) {
        console.log(error)
    }
}
async function deleteDoctor(id) {

    try {
        let conn = await sql.connect(config)
        let doctor = await conn.request()
            .input('id', sql.Int, id)
            .query(`
        alter table Doctors_Table nocheck constraint all
        alter table Users nocheck constraint all
        alter table Doctor_Patient_Date_Table nocheck constraint all
        DELETE FROM Users WHERE Users.Doctor_Id=@id
        delete  from Doctors_Table where Doctors_Table.Id =@id
        DELETE FROM Doctor_Patient_Date_Table WHERE Doctor_Patient_Date_Table.Doctor_Id=@id
        alter table Doctor_Patient_Date_Table check constraint all
        alter table Doctors_Table check constraint all
        alter table Users check constraint all
         `)

        return doctor.recordsets

    } catch (error) {
        console.log(error)
    }
}

export default {
    getDoctors: getDoctors,
    getLastDoctorId: getLastDoctorId,
    getDoctorById: getDoctorById,
    getDoctorsByUnitId: getDoctorsByUnitId,
    createDoctor: createDoctor,
    deleteDoctor: deleteDoctor,
    getDoctorsByMinistaryId: getDoctorsByMinistaryId
}