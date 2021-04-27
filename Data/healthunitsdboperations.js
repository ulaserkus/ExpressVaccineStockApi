import sql from 'mssql'
import config from './config.js'



async function getHealthUnits() {

    try {
        let db = await sql.connect(config)
        let unitData = await db.request().query("select * from Health_Units")

        return unitData.recordsets

    } catch (error) {
        console.log(error)
    }
}
async function getHealthUnitById(id) {

    try {
        let db = await sql.connect(config)
        let unitData = await db.request()
            .input("id", sql.Int, id)
            .query("select * from Health_Units where Health_Units.Id=@id")

        return unitData.recordset

    } catch (error) {
        console.log(error)
    }
}
async function getHealthUnitByDoctorId(id) {

    try {
        let db = await sql.connect(config)
        let unitData = await db.request()
            .input("id", sql.Int, id)
            .query(`select Unit_Name,Unit_Adress,Unit_Phone,h.Image_Url from Doctors_Table as d join Health_Units as h on d.Unit_Id=h.Id where d.Id=@id`)

        return unitData.recordset

    } catch (error) {
        console.log(error)
    }
}
async function createHealthUnit(_unit) {

    try {
        let db = await sql.connect(config)

        let unitData = await db.request()
            .input("name", sql.NVarChar, _unit.Unit_Name)
            .input("adress", sql.NVarChar, _unit.Unit_Adress)
            .input("phone", sql.NVarChar, _unit.Unit_Phone)
            .input("ministary", sql.Int, _unit.Ministary_Id)
            .input("img", sql.NVarChar, _unit.Image_Url)
            .query(`insert into Health_Units values(@name,@adress,@phone,@ministary,@img)`)

        return unitData.recordsets

    } catch (error) {

        console.log(error)

    }
}
async function createHealthUnitReport(report) {

    try {
        let db = await sql.connect(config)

        let unitData = await db.request()
            .input("count", sql.BigInt, report.Remaining_Vaccine_Count)
            .input("need", sql.BigInt, report.Unit_Needs)
            .input("date", sql.SmallDateTime, report.Report_Date)
            .input("unitid", sql.Int, report.Unit_Id)
            .query(`insert into Health_Unit_Reports values(@count,@need,@date,@unitid)`)

        return unitData.recordsets

    } catch (error) {

        console.log(error)

    }
}

async function updateHealthUnit(_unit,id) {

    try {
        let db = await sql.connect(config)

        let unitData = await db.request()
            .input("id", sql.Int, id)
            .input("name", sql.NVarChar, _unit.Unit_Name)
            .input("adress", sql.NVarChar, _unit.Unit_Adress)
            .input("phone", sql.NVarChar, _unit.Unit_Phone)
            .input("ministary", sql.Int, _unit.Ministary_Id)
            .input("img", sql.NVarChar, _unit.Image_Url)
            .query(`UPDATE Health_Units  SET Unit_Name=@name, Unit_Adress=@adress ,Unit_Phone=@phone,Health_Units.Ministary_Id=@ministary,Health_Units.Image_Url=@img where Id=@id`)

        return unitData.recordsets

    } catch (error) {

        console.log(error)

    }
}

async function createUser(user) {
    try {
        let db = await sql.connect(config)
        let users = await db.request()
            .input("name", sql.NVarChar, user.Username)
            .input("pass", sql.NVarChar, user.Password)
            .input("role", sql.NVarChar, user.Role)
            .input("ministary", sql.NVarChar, user.Ministary_Id)
            .input("patient", sql.NVarChar, user.Patient_Id)
            .input("doctor", sql.NVarChar, user.Doctor_Id)
            .input("unit", sql.NVarChar, user.Health_Unit_Id)
            .input("producer", sql.NVarChar, user.Producer_Id)
            .query(`INSERT INTO dbo.Users VALUES (@name,@pass,@role,@ministary,@patient,@doctor,@unit,@producer)`)

        return users.recordsets

    } catch (error) {

        console.log(error)

    }
}


async function getHealthUnitsByMinistaryId(id) {

    try {
        let db = await sql.connect(config)
        let unitData = await db.request()
            .input("id", sql.Int, id)
            .query("select * from Health_Units where Ministary_Id=@id")

        return unitData.recordsets

    } catch (error) {
        console.log(error)
    }
}

async function getHealthUnitsReportByMinistaryId(id) {

    try {
        let db = await sql.connect(config)
        let unitData = await db.request()
            .input("id", sql.Int, id)
            .query(`select hr.Id,Unit_Name,Remaining_Vaccine_Count,Unit_Needs,Report_Date from Health_Units as h join Health_Unit_Reports as hr on h.Id=hr.Unit_Id where h.Ministary_Id=@id`)

        return unitData.recordsets

    } catch (error) {
        console.log(error)
    }
}
async function getHealthUnitReportsById(id) {

    try {
        let db = await sql.connect(config)
        let unitData = await db.request()
            .input("id", sql.Int, id)
            .query(`select * from Health_Unit_Reports where Health_Unit_Reports.Unit_Id=@id`)

        return unitData.recordsets

    } catch (error) {
        console.log(error)
    }
}
async function getLastHealthUnitId() {

    try {
        let db = await sql.connect(config)
        let unitData = await db.request().query("select Top 1 Id from Health_Units order by Id desc")

        return unitData.recordset

    } catch (error) {
        console.log(error)
    }
}

async function getLastPatientId() {

    try {
        let db = await sql.connect(config)
        let unitData = await db.request().query("select Top 1 Id from Patients_Table order by Id desc")

        return unitData.recordset

    } catch (error) {
        console.log(error)
    }
}

async function deleteHealthUnitById(id) {

    try {
        let db = await sql.connect(config)
        let unitData = await db.request()
            .input("id", sql.Int, id)
            .query(`alter table Health_Units nocheck constraint all
            alter table Doctors_Table nocheck constraint all
            alter table Health_Unit_Reports nocheck constraint all
            DELETE FROM Users WHERE Users.Health_Unit_Id=@id
            DELETE FROM Health_Units WHERE Health_Units.Id=@id
            delete from Doctors_Table where Doctors_Table.Unit_Id=@id
            delete from Health_Unit_Reports where Health_Unit_Reports.Unit_Id=@id
            alter table Health_Unit_Reports check constraint all
            alter table Doctors_Table check constraint all
            alter table Health_Units check constraint all`)

        return unitData.recordset

    } catch (error) {
        console.log(error)
    }
}


async function deleteHealthUnitReportById(id) {

    try {
        let db = await sql.connect(config)
        let unitData = await db.request()
            .input("id", sql.Int, id)
            .query(`DELETE FROM Health_Unit_Reports WHERE Id=@id`)

        return unitData.recordset

    } catch (error) {
        console.log(error)
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
    getLastPatientId:getLastPatientId,
    createUser: createUser,
    deleteHealthUnitById: deleteHealthUnitById,
    updateHealthUnit: updateHealthUnit,
    createHealthUnitReport:createHealthUnitReport,
    deleteHealthUnitReportById:deleteHealthUnitReportById
}