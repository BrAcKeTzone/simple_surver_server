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

// Function to get all saved data entries
const getAllSurveyResponses = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Check if startDate and endDate are provided
    if (startDate && endDate) {
      const allSurveyResponses = await SurveyResponse.findAll({
        where: {
          dateTaken: {
            [Op.between]: [startDate, endDate],
          },
        },
      });
      const parsedSurveyResponses = allSurveyResponses.map((response) => {
        return {
          ...response.toJSON(),
          answers: response.answers,
        };
      });

      res.status(200).json(parsedSurveyResponses);
    } else {
      const allSurveyResponses = await SurveyResponse.findAll();
      const parsedSurveyResponses = allSurveyResponses.map((response) => {
        return {
          ...response.toJSON(),
          answers: response.answers,
        };
      });

      res.status(200).json(parsedSurveyResponses);
    }
  } catch (error) {
    console.error("Error getting survey responses:", error);
    res.status(500).json({ message: "Failed to retrieve survey responses" });
  }
};

// Function to get filtered survey responses by age range and gender
const getFilteredSurveyResponses = async (req, res) => {
  try {
    const { minAge, maxAge, gender } = req.query;

    // Build filter object
    const filter = {};
    if (minAge && maxAge) {
      filter.age = {
        [Op.between]: [minAge, maxAge],
      };
    } else if (minAge) {
      filter.age = {
        [Op.gte]: minAge,
      };
    } else if (maxAge) {
      filter.age = {
        [Op.lte]: maxAge,
      };
    }

    if (gender) {
      filter.gender = gender;
    }

    // Retrieve filtered survey responses
    const filteredSurveyResponses = await SurveyResponse.findAll({
      where: filter,
    });

    const parsedFilteredSurveyResponses = filteredSurveyResponses.map(
      (response) => ({
        ...response.toJSON(),
        answers: response.answers,
      })
    );

    res.status(200).json(parsedFilteredSurveyResponses);
  } catch (error) {
    console.error("Error getting filtered survey responses:", error);
    res
      .status(500)
      .json({ message: "Failed to retrieve filtered survey responses" });
  }
};

module.exports = {
  saveSurveyResponse,
  getAllSurveyResponses,
  getFilteredSurveyResponses,
};
