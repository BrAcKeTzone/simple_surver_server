const SurveyResponse = require("../models/participantModel");

// Function to save the participant survey response object
const saveSurveyResponse = async (req, res) => {
  try {
    const { fullname, age, gender, answers } = req.body;
    const surveyResponse = await SurveyResponse.create({
      fullname,
      age,
      gender,
      answers,
    });
    res
      .status(201)
      .json({ message: "Survey response saved successfully", surveyResponse });
  } catch (error) {
    console.error("Error saving survey response:", error);
    res.status(500).json({ message: "Failed to save survey response" });
  }
};

// Function to get all saved data entries
const getAllSurveyResponses = async (req, res) => {
  try {
    const allSurveyResponses = await SurveyResponse.findAll();
    const parsedSurveyResponses = allSurveyResponses.map((response) => ({
      ...response.toJSON(),
      answers: JSON.parse(response.answers),
    }));
    res.status(200).json(parsedSurveyResponses);
  } catch (error) {
    console.error("Error getting survey responses:", error);
    res.status(500).json({ message: "Failed to retrieve survey responses" });
  }
};

module.exports = {
  saveSurveyResponse,
  getAllSurveyResponses,
};
