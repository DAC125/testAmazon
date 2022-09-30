const Request = require("../../models/request");

const mongoose = require('mongoose');

const rRequestCtrl = {};

//Get all data of a collection
rRequestCtrl.getRequestMainData = async (req, res) => {
     const request = await Request.find();
     res.json(request);
};

//Get the status request with the sequence request
rRequestCtrl.getRequest = async (req, res) => {
     const request = await Request.aggregate([{ $match: { seq: req.params.seq }}]);
     res.json(request);
};


rRequestCtrl.getStatusRequest = async (req, res) => {
     const request = await Request.aggregate([{ $match: { status: req.params.status }}]);
     res.json(request);
};

rRequestCtrl.getDateRequest = async (req, res) => {
     const request = await Request.find({creationDate: { $gte: req.params.iDate, $lte: req.params.eDate }});
     res.json(request);
};

module.exports = rRequestCtrl;
