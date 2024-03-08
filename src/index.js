const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./config/sequelize");

const participantRoute = require("./routes/participantRoute");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.options("*", cors());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(bodyParser.json());

app.use("/survey", participantRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  sequelize
    .sync({ alter: false }) // Use { force: true } or { alter: true } during development to drop and recreate tables
    .then(() => {
      console.log("Connected to the database");
    })
    .catch((error) => {
      console.error("Unable to connect to the database:", error);
    });
});
