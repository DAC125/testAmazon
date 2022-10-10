const Request = require("../../models/request");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

const mongoose = require('mongoose');

const uRequestCtrl = {};
let updateData;

//Update the request in mongodb with new information
uRequestCtrl.updateRequest = async (req, res) => {
     
     try {
          const cons = await Request.aggregate([{ $match: { seq: req.params.seq } }]);
          const updateData = await Request.findByIdAndUpdate(cons[0]._id, req.body.dataS, { new: true });

          if (!updateData) return res.status(404).json({ msg: "The request could not be updated" });
          return res.status(200).json({ message: "Request Updated!" });

     } catch (error) {
          return res.status(400).json({ msg: error.message });
     }

};

//Update Phases
uRequestCtrl.updatePhase = async (req, res) => {
     try {
          const cons = await Request.aggregate([{ $match: { seq: req.params.seq } }]);

          if (cons.length === 0) {
               return res.status(404).json({ message: "Request not Found!" });
          } else {
               console.log("Update data Certificate",cons[0]._id, req.body.newPhase);
               updateData = await Request.findByIdAndUpdate(cons[0]._id, req.body.newPhase, { new: true });
          }

          if (!updateData) return res.status(404).json({ msg: "The request could not be updated" });
          return res.status(200).json({ message: "Phase Updated!" });

     } catch (error) {
          return res.status(400).json({ msg: error.message });
     }

};


module.exports = uRequestCtrl;
