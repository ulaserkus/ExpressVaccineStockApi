class Ministary {
    Ministary_Country
    Ministary_Needs
    Last_Purchase_Date
    Last_Purchased_Vaccine_Count
    Total_Vaccine_Count
    Image_Url

    constructor(Ministary_Country, Ministary_Needs, Last_Purchase_Date, Last_Purchased_Vaccine_Count, Total_Vaccine_Count, Image_Url) {
        this.Ministary_Country = Ministary_Country
        this.Ministary_Needs = Ministary_Needs
        this.Last_Purchase_Date = Last_Purchase_Date
        this.Last_Purchased_Vaccine_Count = Last_Purchased_Vaccine_Count
        this.Total_Vaccine_Count = Total_Vaccine_Count
        this.Image_Url = Image_Url
    }
}

export default Ministary