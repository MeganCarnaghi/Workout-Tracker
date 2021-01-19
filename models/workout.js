// Required Dependencies
const mongoose = require("mongoose");

// Creating Mongoose schema
const Schema = mongoose.Schema;

// Creating WorkoutSchema
const WorkoutSchema = new Schema(
  {
    day: {
      type: Date,
      default: Date.now,
    },
    exercises: [
      {
        type: {
          type: String,
          trim: true,
          required: true,
        },
        name: {
          type: String,
          trim: true,
          required: true,
        },
        duration: {
          type: Number,
          default: 0,
          required: true,
        },
        weight: {
          type: Number,
          default: 0,
        },
        reps: {
          type: Number,
          default: 0,
        },
        sets: {
          type: Number,
          default: 0,
        },
        distance: {
          type: Number,
          default: 0,
        },
      },
    ],
    totalDuration: {
      type: Number,
      default: 0,
    },
  },
  { toJSON: { virtuals: true } }
);

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
