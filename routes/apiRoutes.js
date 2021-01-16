// Require Dependencies
const db = require("../models");

// Create api routes
module.exports = (app) => {
  // GET route to retrieve all workouts
  app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
      .then((dbWorkout) => {
        dbWorkout.forEach((workout) => {
          let total = 0;
          workout.exercises.forEach((e) => {
            total += e.duration;
          });
          workout.totalDuration = total;
        });

        res.json(dbWorkout);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  // POST route to add a new workout
  app.post("/api/workouts", ({ body }, res) => {
    db.Workout.create(body)
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });

  // PUT route to update a workout
  app.put("/api/workouts/:id", (req, res) => {
    db.Workout.findOneAndUpdate(
      { _id: req.params.id },
      {
        $inc: { totalDuration: req.body.duration },
        $push: { exercises: req.body },
      },
      { new: true, runValidators: true }
    )
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });

  // GET route to get range of workouts
  app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
      .limit(7)
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });
};
