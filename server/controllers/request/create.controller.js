const Request = require("../../models/request");
const Year = require("../../models/counterYear");
const Sequence = require("../../models/sequence");
const sgMail = require('@sendgrid/mail');
const fs = require('fs');
sgMail.setApiKey('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');

const mongoose = require('mongoose');

const cRequestCtrl = {};

//Get the year to put in the consecutive request
async function getYear() {
     const oldYear = await Year.aggregate([{ $match: { id: "consecutiveYear" } }]);
     let currentYear = new Date().getFullYear();

     if (oldYear.length !== 0) {
          if (oldYear[0].seq != currentYear) {
               const newYear = await Year.findByIdAndUpdate(oldYear[0]._id, { $set: { seq: currentYear } }, { new: true });
               Request.counterReset('consecutive', function (err) {
                    console.log("Counter ir reset");
               });
               return newYear.seq;
          } else {
               return oldYear[0].seq;
          }
     } else {
          const year = new Year({ "id": "consecutiveYear", "seq": currentYear });
          await year.save();
          return currentYear;
     };
}

//Insert the request in mongodb with all the information of the request
cRequestCtrl.insertRequest = async (req, res) => {
     let bdConsecutive = await Sequence.find();
     let consecutive = 0;
     if (Object.keys(bdConsecutive).length !== 0) {
          consecutive = bdConsecutive[0].seq;
     }

     try {
          if (consecutive < 99999) {
               const request = new Request(req.body.data);
               const year = await getYear();
              
               await request.save();

               let fullDate = new Date().toISOString().slice(0, 10);
               
               const data = { seq: "DOC-" + Array(5 - String(request.consecutive).length + 1).join('0') + request.consecutive + "-" + year, creationDate: fullDate };

               const requestSave = await Request.findByIdAndUpdate(request._id, { $set: data }, { new: true });
               
               if (!requestSave) return res.status(404).json({ msg: "The request could not be registered" });
               let email = req.body.data.email;
               let seq = data.seq;
               await sendEmail({seq, email});
               return res.status(200).json({ message: "Request Created!" });
          } else {
               return res.status(404).json({ msg: "The request could not be registered" });
          }
     } catch (error) {
          return res.status(400).json({ msg: error.message });
     }
};


//An email is sent to the user with the request number
async function sendEmail(req, res) {
     const pathToAttachment = `src/Images/logo.png`;
     const attachment = fs.readFileSync(pathToAttachment).toString("base64");
     const subject = 'Plataforma de Servicios Municipalidad de Sarchí';
     const footerEmail = '<br><div><p>Gracias</p><p>Saludos</p> <p><img src="cid:myimagecid"/><p> </div>';
     const htmlString = '<div> <p>Estimado(a) solicitante,<p> <br> </br>Se ha enviado correctamente toda la documentación y requisitos para el trámite de exoneración de bienes inmuebles de la Municipalidad de Sarchí. A continuación se adjunta. Su número de solicitud es: ' + req.seq + '</div> <br>' + footerEmail;

     const htmlTemplate = htmlString;
     const emailRequester = req.email;

     console.log("subject", subject);
  
     sgMail.send({
          to: emailRequester,
          from: 'mjosebp1616@gmail.com' ,
          subject: subject,
          content: [{ type: "text/html", value: htmlTemplate }],

          attachments: [
               {
                    filename: "src/Images/logo.png",
                    type: "image/png",
                    content: attachment,
                    content_id: "myimagecid",
                    disposition: "inline"
               }
          ]
     }).catch((error) => {
          console.log("Error", error.response.body)
          return res.status(404).json({ message: error.response.body });
     });
}


cRequestCtrl.notAllowRequest = async (req, res) => {    
     const pathToAttachment = `logo.png`;
     const attachment = fs.readFileSync(pathToAttachment).toString("base64");
     const subject = 'Plataforma de Servicios Municipalidad de Acosta';
     const footerEmail = '<br><div><p>Gracias</p><p>Saludos</p> <p><img src="cid:myimagecid"/><p> </div>';
     const htmlString = '<div> <p>Estimado(a) solicitante,<p> <br> </br>Su solicitud número ' + req.body.data.seq + ' No ha sido aceptada ' + req.body.data.reason +  '</div> <br>' + footerEmail;

     const htmlTemplate = htmlString;

     sgMail.send({
          to: req.body.data.email,
          from: 'mjosebp1616@gmail.com' ,
          subject: subject,
          content: [{ type: "text/html", value: htmlTemplate }],

          attachments: [
               {
                    filename: "src/Images/logo.png",
                    type: "image/png",
                    content: attachment,
                    content_id: "myimagecid",
                    disposition: "inline"
               }
          ]
     }).catch((error) => {
          console.log("Error", error.response.body)
          return res.status(404).json({ message: error.response.body });
     });

}


//Get request pending according to role
cRequestCtrl.getPendingRequest = async (req, res) => {    
     role = req.body.data.role;
}


module.exports = cRequestCtrl;
