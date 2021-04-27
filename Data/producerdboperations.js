import config from './config.js'
import sql from 'mssql'


async function getProducers(id) {
    try {
        let pool = await sql.connect(config)
        let producers = await pool.request()
        .input('id',sql.Int,id)
        .query(`select * from Producer_Table where Producer_Table.Id not in (select Producer_Id from Producer_Ministary where Ministary_Id=@id)`)
        return producers.recordsets

    } catch (error) {
        console.log(error)
    }

}

async function getLastProducerId(id) {
    try {
        let pool = await sql.connect(config)
        let producers = await pool.request().query("select Top 1 Id from Producer_Table order by Id desc")
        return producers.recordset

    } catch (error) {
        console.log(error)
    }

}

async function getProducerById(id) {
    try {
        let pool = await sql.connect(config)
        let producers = await pool.request().input('id', sql.Int, id).query("select * from Producer_Table where Id=@id")
        return producers.recordset

    } catch (error) {
        console.log(error)
    }

}


async function getProducersWithStocks(id) {
    try {
        let db = await sql.connect(config)
        let producerWithStocks = await db.request()
            .input('id', sql.Int, id)
            .query(`SELECT Vaccine_Stock.Id as Vaccine_Id,Producer_Id,Producer_Name,Producer_Phone,Producer_Email,Producer_Adress,Producer_Country,Vaccine_Stock.Id,Vaccine_Name,Vaccine_Count,Last_Production_Date,Vaccine_Stock.Image_Url
            FROM Producer_Table
            INNER JOIN Vaccine_Stock ON Producer_Table.Id=Vaccine_Stock.Producer_Id where Vaccine_Count>0 and Producer_Id=@id`)
        return producerWithStocks.recordsets

    } catch (error) {
        console.log(error)
    }

}


async function createProducer(Producer) {
    try {
        let pool = await sql.connect(config)
        let patients = await pool.request()
            .input("name", sql.NVarChar, Producer.Producer_Name)
            .input("country", sql.NVarChar, Producer.Producer_Country)
            .input("email", sql.NVarChar, Producer.Producer_Email)
            .input("phone", sql.NVarChar, Producer.Producer_Phone)
            .input("address", sql.NVarChar, Producer.Producer_Adress)
            .input("img", sql.NVarChar, Producer.Image_Url)
            .input("id", sql.NVarChar, Producer.Ministary_Id)
            .query('insert into Producer_Table values(@name,@country,@email,@phone,@address,@id,@img)')

        return patients.recordsets

    } catch (error) {

        console.log(error)

    }
}

async function deleteProducer(id) {
    try {
        let db = await sql.connect(config)
        let producerWithStocks = await db.request()
            .input('id', sql.Int, id)
            .query(`    
            alter table Producer_Table nocheck constraint all
            alter table Users nocheck constraint all
            alter table Vaccine_Stock nocheck constraint all
            DELETE FROM Producer_Table WHERE Id=@id
            delete  from Users where Users.Producer_Id =@id
            delete  from Vaccine_Stock where Vaccine_Stock.Producer_Id=@id
            alter table Vaccine_Stock check constraint all
            alter table Producer_Table check constraint all
            alter table Users check constraint all`)
        return producerWithStocks.recordsets

    } catch (error) {
        console.log(error)
    }

}


export default {
    getProducers: getProducers,
    getProducersWithStocks: getProducersWithStocks,
    createProducer: createProducer,
    deleteProducer: deleteProducer,
    getProducerById: getProducerById,
    getLastProducerId: getLastProducerId
}