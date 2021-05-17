import config from './config.js'
import sql from 'mssql'

async function getProducersByMinistaryId(id) {
    try {
        let pool = await sql.connect(config)
        let patients = await pool.request()
            
            .input("id", sql.Int,id)
            .query('select pt.Id,pt.Producer_Name,pt.Producer_Country,pt.Producer_Email,pt.Producer_Phone,pt.Producer_Adress,pt.Image_Url from  Producer_Table as pt join Producer_Ministary as pm on pt.Id=pm.Producer_Id where pm.Ministary_Id=@id')

        return patients.recordsets

    } catch (error) {

        console.log(error)

    }
}


async function createProducerMinistary(obj) {
    try {
        let pool = await sql.connect(config)
        let patients = await pool.request()
            
            .input("ministaryid", sql.NVarChar, obj.Ministary_Id)
            .input("producerid", sql.NVarChar, obj.Producer_Id)
            .query('insert into Producer_Ministary values(@producerid,@ministaryid)')

        return patients.recordsets

    } catch (error) {

        console.log(error)

    }
}


async function deleteProducerMinistary(id) {
    try {
        let pool = await sql.connect(config)
        let db = await pool.request().input("id", sql.Int, id).query('delete from Producer_Ministary where Producer_Id=@id')

        return db.recordsets

    } catch (error) {

        console.log(error)

    }
}


export default{
    createProducerMinistary:createProducerMinistary,
    getProducersByMinistaryId:getProducersByMinistaryId,
    deleteProducerMinistary:deleteProducerMinistary
}
