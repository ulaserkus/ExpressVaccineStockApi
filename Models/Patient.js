class Patient {
    FullName
    Phone
    Adress
    Age
    HasVaccinated
    HasCronicPatient
    Unit_Id
    Image_Url
     
    
    constructor(FullName,Phone,Adress,Age,HasVaccinated,HasCronicPatient,Unit_Id,Image_Url){

        this.FullName=FullName,
        this.Phone=Phone,
        this.Adress=Adress,
        this.Age=Age,
        this.HasVaccinated=HasVaccinated,
        this.HasCronicPatient=HasCronicPatient,
        this.Unit_Id=Unit_Id
        this.Image_Url=Image_Url
    }
   

}
export default Patient