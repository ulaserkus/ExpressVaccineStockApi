import sql from 'mssql'
import config from './config.js'




async function getMinistary() {

    try {
        let db = await sql.connect(config)
        let ministaryData = await db.request().query("select * from Ministary_Table")

        return ministaryData.recordsets

    } catch (error) {
        console.log(error)
    }
}

async function getMinistaryProducer(id) {

    try {
        let db = await sql.connect(config)
        let ministaryData = await db.request()
        .input("id",sql.Int,id)
        .query("select  Ministary_Table.Id ,Ministary_Country,Ministary_Needs,Last_Purchase_Date,Last_Purchased_Vaccine_Count,Total_Vaccine_Count,Image_Url from Ministary_Table join  Producer_Ministary on Producer_Ministary.Ministary_Id=Ministary_Table.Id where Producer_Id=@id")

        return ministaryData.recordsets

    } catch (error) {
        console.log(error)
    }
}

async function getMinistaryById(id) {

    try {
        let db = await sql.connect(config)
        let ministaryData = await db.request()
            .input("id", sql.Int, id)
            .query("select Top 1 * from Ministary_Table as m where m.Id = @id  order by m.Id desc")

        return ministaryData.recordset

    } catch (error) {
        console.log(error)
    }
}
async function CreateMinistaryById(ministary) {

    try {
        let db = await sql.connect(config)
        let ministaryData = await db.request()
            .input("name", sql.NVarChar, ministary.Ministary_Country)
            .input("need", sql.BigInt, ministary.Ministary_Needs)
            .input("date", sql.SmallDateTime, ministary.Last_Purchase_Date)
            .input("purchased", sql.BigInt, ministary.Last_Purchased_Vaccine_Count)
            .input("total", sql.BigInt, ministary.Total_Vaccine_Count)
            .input("img", sql.NVarChar, ministary.Image_Url)

            .query(`insert into Ministary_Table
        values(@name, @need,@date,@purchased,@total,@img);`)

        return ministaryData.recordset

    } catch (error) {
        console.log(error)
    }
}

async function UpdateMinistaryById(ministary, id) {

    try {
        let db = await sql.connect(config)
        let ministaryData = await db.request()
            .input("id", sql.Int, id)
            .input("name", sql.NVarChar, ministary.Ministary_Country)
            .input("need", sql.BigInt, ministary.Ministary_Needs)
            .input("date", sql.SmallDateTime, ministary.Last_Purchase_Date)
            .input("purchased", sql.BigInt, ministary.Last_Purchased_Vaccine_Count)
            .input("total", sql.BigInt, ministary.Total_Vaccine_Count)
            .input("img", sql.NVarChar, ministary.Image_Url)

            .query(`UPDATE Ministary_Table
        SET Ministary_Country = @name, Ministary_Needs = @need,Total_Vaccine_Count=@total,Image_Url=@img,Last_Purchase_Date=@date,Last_Purchased_Vaccine_Count=@purchased WHERE Id=@id;`)

        return ministaryData.recordset

    } catch (error) {
        console.log(error)
    }
}

async function getLastMinistaryId() {
    try {
        let pool = await sql.connect(config)
        let doctors = await pool.request().query('select Top 1 Id from Ministary_Table as d order by Id desc')
        return doctors.recordset

    } catch (err) {
        console.log(err)
    }
}


async function getMinistaryAndVaccineCount() {
    try {
        let pool = await sql.connect(config)
        let doctors = await pool.request().query('select distinct Ministary_Country,Total_Vaccine_Count from Ministary_Stock ms join Ministary_Table  mt  on ms.Ministary_Id=mt.Id')
        return doctors.recordsets

    } catch (err) {
        console.log(err)
    }
}


export default {
    getMinistary: getMinistary,
    getMinistaryById, getMinistaryById,
    UpdateMinistaryById: UpdateMinistaryById,
    getLastMinistaryId: getLastMinistaryId,
    CreateMinistaryById:CreateMinistaryById,
    getMinistaryProducer:getMinistaryProducer,
    getMinistaryAndVaccineCount:getMinistaryAndVaccineCount

}