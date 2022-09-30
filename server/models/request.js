const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

const { Schema } = mongoose;

const request = new Schema({
    consecutive: {type: Number, requires: true},
    seq: {type: String, requires: false},
    status: {type: String, requires: true},
    hour: {type: String, requires: true},
    date: {type: String, requires: true},
    name: {type: String, requires: true},
    idNumber: {type: String, requires: true},
    email: {type: String, requires: true},
    phoneNumber1: {type: Number, requires: true},
    phoneNumber2: {type: Number, requires: true},
    address: {type: String, requires: true},
    digitalSignature:  {type: String, requires: true},
    declaration:  {type: String, requires: true},
    stateDeclaration:  {type: String, requires: true},
    certificate:  {type: String, requires: true},
    stateCertificate:  {type: String, requires: true},
    paymentProof: {type: String, requires: true},
    statePaymentProof: {type: String, requires: true},
    creationDate: { type: String, requires: true }
});


request.plugin(autoIncrement, {id: 'consecutive', inc_field: 'consecutive', start_seq: 1});

module.exports = mongoose.model("Request", request);