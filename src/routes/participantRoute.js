const express = require("express");
const router = express.Router();
const participantController = require("../controllers/participantController");

router.post("/save", participantController.saveSurveyResponse);

router.get("/review", participantController.getAllSurveyResponses);

router.get("/filter", participantController.getFilteredSurveyResponses);
module.exports = router;
