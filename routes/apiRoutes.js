// Require Dependencies
const db = require("../models");

// Create api routes
module.exports = (app) => {
  // GET route to retrieve all workouts
  app.get("/api/workouts", function (req, res) {
    db.Workout.find({})
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });
};
