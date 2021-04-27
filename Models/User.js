class User {
    
    Username
    Password
    Role
    Ministary_Id
    Patient_Id
    Doctor_Id
    Health_Unit_Id
    Producer_Id
    constructor(Username, Password, Role,Ministary_Id,Patient_Id,Doctor_Id,Health_Unit_Id,Producer_Id) {
        this.Username = Username,
            this.Password = Password,
            this.Role = Role,
            this.Ministary_Id=Ministary_Id,
            this.Patient_Id=Patient_Id,
            this.Doctor_Id=Doctor_Id,
            this.Health_Unit_Id=Health_Unit_Id
            this.Producer_Id=Producer_Id

    }
}


export default User