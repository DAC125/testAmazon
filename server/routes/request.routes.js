const express = require("express");
const router = express.Router();

const cRequestCtrl = require("../controllers/request/create.controller");
const rRequestCtrl = require("../controllers/request/read.controller");
const uRequestCtrl = require("../controllers/request/update.controller");

router.post("/", cRequestCtrl.insertRequest);
router.get("/mainData", rRequestCtrl.getRequestMainData);
router.get("/statusRequest/:status", rRequestCtrl.getStatusRequest);
router.get("/dateRequest/:iDate/:eDate", rRequestCtrl.getDateRequest);
router.get("/specificRequest/:seq", rRequestCtrl.getRequest);

router.post("/notAllowRequest", cRequestCtrl.notAllowRequest);
router.post("/updateRequest/:seq", uRequestCtrl.updateRequest);
router.post("/updatePhase/:seq", uRequestCtrl.updatePhase);
router.post("/sendEmailRequest",cRequestCtrl.sendEmailRequest);
module.exports = router;