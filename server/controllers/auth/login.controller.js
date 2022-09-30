const Login = require("../../models/auth");
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const rLoginCtrl = {};

//Validate that username and password exist and are correct
rLoginCtrl.getValidationLogin = async (req, res) => {
    const login = await Login.aggregate([{ $match: { userName: req.body.userName }}])

    if (Object.keys(login).length === 0) {
        return res.status(404).json({ msg: "The user could not be login,incorrect userName" });
    } else {
        bcrypt.compare(req.body.password, login[0].password, function(err, result) {
           if (result === true) {
              console.log("Successful Login");
              return res.status(200).json(login);
           }else{
              return res.status(404).json({ msg: "The user could not be login, incorrect password" });
           } 
        });

    }
};

module.exports = rLoginCtrl;