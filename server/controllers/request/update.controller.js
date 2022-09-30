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
          const updateData = await Request.findByIdAndUpdate(cons[0]._id, req.body, { new: true });
          const email =  cons[0].emailRequester;

          if (req.body.notifyPerson){
               await sendEmail(email);
          }

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
               console.log("Update data Certificate");
               updateData = await Request.findByIdAndUpdate(cons[0]._id, req.body, { new: true });
          }

          if (!updateData) return res.status(404).json({ msg: "The request could not be updated" });
          return res.status(200).json({ message: "Phase Updated!" });

     } catch (error) {
          return res.status(400).json({ msg: error.message });
     }

};

//An email is sent to the user indicating an inspection in the next 7 days
async function sendEmail(req, res) {
     const subject = 'Plataforma de Servicios Municipalidad de Acosta';
     const footerEmail = '<br><div><p>Gracias</p><p>Saludos</p></div>';
     const htmlString = '<div> <p>Estimado(a) solicitante,<p> <br> </br>En los próximos 7 días se le contactará para coordinar la visita para inspección</div> <br>' + footerEmail;
     const htmlTemplate = htmlString;

     sgMail.send({
          to: req,
          from: 'mjosebp1616@gmail.com',
          subject: subject,
          content: [{ type: "text/html", value: htmlTemplate }],
     }).catch((error) => {
          console.log(error.response.body)
     });
}

module.exports = uRequestCtrl;
