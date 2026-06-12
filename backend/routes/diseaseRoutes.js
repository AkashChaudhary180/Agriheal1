// backend/routes/diseaseRoutes.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/diseaseController");

router.get("/crops", controller.listCrops);
router.post("/diagnose", controller.diagnose);

module.exports = router;
