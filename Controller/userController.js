import dboperations from '../Data/userdboperations.js'
import jwt from 'jsonwebtoken'

const accessTokenSecret = 'yoursecretaccesstoken';

var userLogin = (req, res) => {

    const { username, password } = req.body;

    if (req.body.username != null && req.body.password != null) {

        dboperations.findUser(username, password).then(result => {
            if (result[0][0]) {

                let accessToken

                switch (result[0][0].Role) {
                    case "admin":
                        accessToken = jwt.sign({ username: result[0][0].Username, role: result[0][0].Role, ministary_id: result[0][0].Ministary_Id }, accessTokenSecret, { expiresIn: 15 * 60 });
                        break

                    case "doctor":
                        accessToken = jwt.sign({ username: result[0][0].Username, role: result[0][0].Role, doctor_id: result[0][0].Doctor_Id }, accessTokenSecret, { expiresIn: 15 * 60 })
                        break

                    case "patient":
                        accessToken = jwt.sign({ username: result[0][0].Username, role: result[0][0].Role, patient_id: result[0][0].Patient_Id }, accessTokenSecret, { expiresIn: 15 * 60 })
                        break

                    case "healthunit":
                        accessToken = jwt.sign({ username: result[0][0].Username, role: result[0][0].Role, unit_id: result[0][0].Health_Unit_Id }, accessTokenSecret, { expiresIn: 15 * 60 })
                        break

                    case "producer":
                        accessToken = jwt.sign({ username: result[0][0].Username, role: result[0][0].Role, producer_id: result[0][0].Producer_Id }, accessTokenSecret, { expiresIn: 15 * 60 })
                        break

                    default:
                        accessToken = jwt.sign({ username: result[0][0].Username, role: result[0][0].Role }, accessTokenSecret, { expiresIn: 15 * 60 })
                        break

                }

                res.json({ accessToken })

               
            } 
            else{
                res.sendStatus(401)
            }
            
         
            
        })

       
    }

}

var getUsers = (req, res) => {
    dboperations.getUsers().then(result => {
        res.json(result[0])
    })
}

var getDoctorUsersByMinistaryId = (req, res) => {
    const { id } = req.params

    dboperations.getDoctorUsersByMinistaryId(id).then(result => {
        res.json(result[0])
    })
}

var getUnitUsersByMinistaryId = (req, res) => {
    const { id } = req.params

    dboperations.getUnitUsersByMinistaryId(id).then(result => {
        res.json(result[0])
    })
}

var getNotRegisteredDoctorByMinistaryId = (req, res) => {
    const { id } = req.params

    dboperations.getNotRegisteredDoctorByMinistaryId(id).then(result => {
        res.json(result[0])
    })
}


var getNotRegisteredPatientsByUnitId = (req, res) => {
    const { id } = req.params

    dboperations.getNotRegisteredPatientsByUnitId(id).then(result => {
        res.json(result[0])
    })
}


var getNotRegisteredUnitsByMinistaryId = (req, res) => {
    const { id } = req.params

    dboperations.getNotRegisteredUnitsByMinistaryId(id).then(result => {
        res.json(result[0])
    })
}


var deleteUserById = (req, res) => {

    const { id } = req.params

    dboperations.deleteUser(id).then(result => {

        res.send(`${id}'li Kullanıcı Silinidi`)


    })

}


export default {
    userLogin: userLogin,
    getUsers: getUsers,
    getDoctorUsersByMinistaryId: getDoctorUsersByMinistaryId,
    getUnitUsersByMinistaryId: getUnitUsersByMinistaryId,
    getNotRegisteredDoctorByMinistaryId: getNotRegisteredDoctorByMinistaryId,
    getNotRegisteredUnitsByMinistaryId: getNotRegisteredUnitsByMinistaryId,
    deleteUserById: deleteUserById,
    getNotRegisteredPatientsByUnitId: getNotRegisteredPatientsByUnitId,


}