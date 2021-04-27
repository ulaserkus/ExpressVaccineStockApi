import sql from 'mssql'
import config from './config.js'



async function getVaccineStocks(id){

    try {
        let db = await sql.connect(config)
        let ministaryData = await db.request()
        .input("id",sql.Int,id)
        .query("select * from Vaccine_Stock join Ministary_Stock on Vaccine_Stock.Id=Ministary_Stock.Stock_Id where Vaccine_Count>0 and Producer_Id=@id")

        return ministaryData.recordsets
        
    } catch (error) {
        console.log(error)
    }
}


async function getClaimStocks(id){

    try {
        let db = await sql.connect(config)
        let ministaryData = await db.request()
        .input("id",sql.Int,id)
        .query(" select c.Id,c.Ministary_Id,c.Vaccine_Count,c.Date,mt.Ministary_Country from Claim_Stock as c join Ministary_Table as mt on c.Ministary_Id=mt.Id  where Producer_Id=@id")

        return ministaryData.recordsets
        
    } catch (error) {
        console.log(error)
    }
}

async function getVaccineStocksProducerAndCount(){

    try {
        let db = await sql.connect(config)
        let ministaryData = await db.request().query("select  pt.Producer_Name,SUM(mt.Vaccine_Count) as 'Total_Stock' from  Vaccine_Stock  mt join Producer_Table  as pt on mt.Producer_Id=pt.Id group by pt.Producer_Name")

        return ministaryData.recordsets
        
    } catch (error) {
        console.log(error)
    }
}

async function getVaccineStocksByMinistary(id){

    try {
        let db = await sql.connect(config)
        let ministaryData = await db.request()
        .input('id',sql.Int,id)
        .query(`select Vaccine_Stock.Id as Vaccine_Id,Ministary_Stock.Id,Stock_Id,Producer_Id,Producer_Name,Producer_Phone,Producer_Email,Producer_Adress,Producer_Country,Vaccine_Name,Ministary_Stock.Vaccine_Count,Last_Production_Date,Vaccine_Stock.Image_Url from Ministary_Stock join Vaccine_Stock on Vaccine_Stock.Id=Ministary_Stock.Stock_Id INNER JOIN Producer_Table ON Producer_Table.Id=Vaccine_Stock.Producer_Id  where Ministary_Stock.Ministary_Id=@id and Ministary_Stock.Vaccine_Count>0`)

        return ministaryData.recordsets
        
    } catch (error) {
        console.log(error)
    }
}
async function createStock(Stock){
    try {
        let pool = await sql.connect(config)
        let patients =await pool.request()
        .input("name",sql.NVarChar,Stock.Vaccine_Name)
        .input("count",sql.NVarChar,Stock.Vaccine_Count)
        .input("date",sql.SmallDateTime,Stock.Last_Production_Date)
        .input("id",sql.Int,Stock.Producer_Id)
        .input("img",sql.NVarChar,Stock.Image_Url)
        .query('insert into Vaccine_Stock values(@name,@count,@date,@id,@img)')    

        return patients.recordsets
        
    } catch (error) {
    
        console.log(error)
       
    }
}

async function createClaimStock(claim){
    try {
        let pool = await sql.connect(config)
        let patients =await pool.request()
        .input("ministaryid",sql.Int,claim.Ministary_Id)
        .input("producerid",sql.Int,claim.Producer_Id)
        .input("count",sql.BigInt,claim.Vaccine_Count)
        .input("date",sql.SmallDateTime,claim.Date)
        .query('insert into Claim_Stock values(@ministaryid,@producerid,@count,@date)')    

        return patients.recordsets
        
    } catch (error) {
    
        console.log(error)
       
    }
}

async function createMinistaryStock(ministaryid,stockid,count){
    try {
        let pool = await sql.connect(config)
        let patients =await pool.request()
        .input("ministaryid",sql.Int,ministaryid)
        .input("stockid",sql.Int,stockid)
        .input("count",sql.BigInt,count)
        .query('insert into Ministary_Stock values(@ministaryid,@stockid,@count)')    

        return patients.recordsets
        
    } catch (error) {
    
        console.log(error)
       
    }
}
async function UpdateStockById(stock, id) {

    try {
        let db = await sql.connect(config)
        let ministaryData = await db.request()
            .input("id", sql.Int, id)
            .input("name", sql.NVarChar, stock.Vaccine_Name)
            .input("count", sql.BigInt, stock.Vaccine_Count)
            .input("date", sql.SmallDateTime, stock.Last_Production_Date)
            .input("producerid", sql.Int, stock.Producer_Id)
            .input("img", sql.NVarChar, stock.Image_Url)

            .query(`UPDATE Vaccine_Stock
        SET Vaccine_Name = @name, Vaccine_Count = @count,Last_Production_Date=@date,Producer_Id=@producerid,Image_Url=@img WHERE Id=@id;`)

        return ministaryData.recordset 

    } catch (error) {
        console.log(error)
    }
}
async function UpdateClaimStockById(id, ministaryid,stockid,count) {

    try {
        let db = await sql.connect(config)
        let ministaryData = await db.request()
            .input("id", sql.Int, id)
            .input("ministaryid", sql.Int, ministaryid)
            .input("stockid", sql.Int,stockid )
            .input("count", sql.BigInt,count)
            .query(`UPDATE Ministary_Stock
        SET Ministary_Id = @ministaryid, Vaccine_Count = @count,Stock_Id=@stockid WHERE Id=@id;`)

        return ministaryData.recordset 

    } catch (error) {
        console.log(error)
    }
}

async function deleteClaimStock(id){
    try {
        let pool = await sql.connect(config)
        let patients =await pool.request()
        .input("id",sql.Int,id)
        .query('delete from Claim_Stock where Id=@id')    

        return patients.recordsets
        
    } catch (error) {
    
        console.log(error)
       
    }
}

export default {
    getVaccineStocks:getVaccineStocks,
    createStock:createStock,
    UpdateStockById:UpdateStockById,
    createMinistaryStock:createMinistaryStock,
    getVaccineStocksByMinistary:getVaccineStocksByMinistary,
    getVaccineStocksProducerAndCount:getVaccineStocksProducerAndCount,
    createClaimStock:createClaimStock,
    getClaimStocks:getClaimStocks,
    deleteClaimStock:deleteClaimStock,
    UpdateClaimStockById:UpdateClaimStockById
}