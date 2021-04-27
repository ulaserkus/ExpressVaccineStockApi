import sql from 'mssql'
import config from './config.js'



async function getUsers() {

  try {
    let db = await sql.connect(config)
    let users = await db.request().query("select * from Users")
    return users.recordsets

  } catch (error) {
    console.log(error)
  }


}
async function getDoctorUsersByMinistaryId(id) {

  try {
    let db = await sql.connect(config)
    let users = await db.request()
      .input("id", sql.Int, id)
      .query("select u.Id,Username,u.Role,u.Ministary_Id ,u.Patient_Id,u.Doctor_Id,u.Health_Unit_Id from Users as u join Doctors_Table as dt on u.Doctor_Id=dt.Id  join Health_Units as h on h.Id=dt.Unit_Id where h.Ministary_Id=@id;")
    return users.recordsets

  } catch (error) {
    console.log(error)
  }


}
async function getUnitUsersByMinistaryId(id) {

  try {
    let db = await sql.connect(config)
    let users = await db.request()
      .input("id", sql.Int, id)
      .query("select u.Id,Username,u.Role,u.Ministary_Id ,u.Patient_Id,u.Doctor_Id,u.Health_Unit_Id from Users as u join Health_Units as h on u.Health_Unit_Id=h.Id where h.Ministary_Id=@id;")
    return users.recordsets

  } catch (error) {
    console.log(error)
  }


}

async function getNotRegisteredDoctorByMinistaryId(id) {

  try {
    let db = await sql.connect(config)
    let users = await db.request()
      .input("id", sql.Int, id)
      .query(`SELECT td.Id,td.Doctor_FullName,td.Doctor_Phone,td.Doctor_Adress,td.Unit_Id,td.Image_Url  FROM Doctors_Table AS td inner join Health_Units as h on h.Id=td.Unit_Id  
    WHERE (NOT EXISTS
            (SELECT *
             FROM Users AS d
             WHERE (d.Doctor_Id = td.Id))) and h.Ministary_Id=@id`)
    return users.recordsets

  } catch (error) {
    console.log(error)
  }


}
async function getNotRegisteredPatientsByUnitId(id) {

  try {
    let db = await sql.connect(config)
    let users = await db.request()
      .input("id", sql.Int, id)
      .query(`SELECT td.Id,td.Patient_FullName,td.Patient_Phone,td.Patient_Adress,td.Unit_Id,td.Image_Url  FROM Patients_Table AS td 
      WHERE (NOT EXISTS
              (SELECT *
               FROM Users AS d
               WHERE (d.Patient_Id = td.Id))) and td.Unit_Id=@id`)
    return users.recordsets

  } catch (error) {
    console.log(error)
  }


}

async function getNotRegisteredUnitsByMinistaryId(id) {

  try {
    let db = await sql.connect(config)
    let users = await db.request()
      .input("id", sql.Int, id)
      .query(`SELECT td.Id,td.Unit_Name,td.Unit_Adress,td.Unit_Phone,td.Image_Url FROM Health_Units AS td
      WHERE (NOT EXISTS
              (SELECT *
               FROM Users AS d
               WHERE (d.Health_Unit_Id = td.Id))) and td.Ministary_Id=@id`)
    return users.recordsets

  } catch (error) {
    console.log(error)
  }


}
async function deleteUser(Id) {

  try {
      let conn = await sql.connect(config)
      let doctor = await conn.request().input('Id', sql.Int, Id).query("delete  from Users where Id = @Id")

      return doctor.recordsets

  } catch (error) {
      console.log(error)
  }
}


async function findUser(username, password) {


  let db = await sql.connect(config)
  let users = await db.request()
    .input("username", sql.NVarChar, username)
    .input("password", sql.NVarChar, password)
    .query("select Username,Password,Role,Doctor_Id,Patient_Id,Health_Unit_Id,Ministary_Id,Producer_Id from Users where Users.Username=@username and Users.Password=@password")
  return users.recordsets

}


export default {
  findUser: findUser,
  getUsers: getUsers,
  getDoctorUsersByMinistaryId: getDoctorUsersByMinistaryId,
  getUnitUsersByMinistaryId: getUnitUsersByMinistaryId,
  getNotRegisteredDoctorByMinistaryId:getNotRegisteredDoctorByMinistaryId,
  getNotRegisteredUnitsByMinistaryId:getNotRegisteredUnitsByMinistaryId,
  deleteUser:deleteUser,
  getNotRegisteredPatientsByUnitId:getNotRegisteredPatientsByUnitId,



}