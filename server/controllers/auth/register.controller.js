const Auth = require("../../models/auth");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const mongoose = require('mongoose');

const cAuthCtrl = {};

//TODO Change validation of error 
cAuthCtrl.insertRegister = async (req, res) => {
    const user = await Auth.aggregate([{ $match: { userName: req.body.userName }}])

    if (Object.keys(user).length !== 0) {
        return res.status(404).json({ msg: "This user already exists" });
    } else {
     try {
        bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
            const newRegister = new Auth({
                role: req.body.role,
                userName: req.body.userName,
                password: hash,
                inbox: req.body.inbox,
                requesterDataForm: req.body.requesterDataForm,
                inspection: req.body.inspection,
                certificate: req.body.certificate
            });

            newRegister.save(function(err){
                if (err) {
                    return res.status(404).json({ msg: "The user could not be register" });
                } else {
                    return res.status(200).json({ message: "User Register!" });
                }
            });
        });


     } catch (error) {
        return res.status(400).json({ msg: error.message });
     }
    }
};


module.exports = cAuthCtrl;
