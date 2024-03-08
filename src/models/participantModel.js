const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const SurveyResponse = sequelize.define("SurveyResponse", {
  fullname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  answers: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

module.exports = SurveyResponse;
