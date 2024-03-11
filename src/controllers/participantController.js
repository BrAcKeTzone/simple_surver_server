const { Op } = require("sequelize");
const SurveyResponse = require("../models/participantModel");

// Function to save the participant survey response object
const saveSurveyResponse = async (req, res) => {
  try {
    const { fullname, age, gender, answers } = req.body;
    const dateTaken = new Date();
    const surveyResponse = await SurveyResponse.create({
      fullname,
      age,
      gender,
      answers,
      dateTaken,
    });
    res
      .status(201)
      .json({ message: "Survey response saved successfully", surveyResponse });
  } catch (error) {
    console.error("Error saving survey response:", error);
    res.status(500).json({ message: "Failed to save survey response" });
  }
};

/// Function to get all saved data entries with optional gender filter
const getAllSurveyResponses = async (req, res) => {
  try {
    const { startDate, endDate, gender } = req.query;

    // Initialize filter object
    const filter = {};

    // Check if startDate and endDate are provided
    if (startDate && endDate) {
      filter.dateTaken = {
        [Op.between]: [startDate, endDate],
      };
    }

    // Check if gender is provided
    if (gender) {
      filter.gender = gender;
    }

    // Retrieve survey responses based on filters
    const allSurveyResponses = await SurveyResponse.findAll({
      where: filter,
      order: [["dateTaken", "ASC"]], // Sort by dateTaken in ascending order
    });

    // Parse survey responses
    const parsedSurveyResponses = allSurveyResponses.map((response) => ({
      ...response.toJSON(),
      answers: response.answers,
    }));

    // Send response
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
