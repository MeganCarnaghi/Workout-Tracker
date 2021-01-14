// Required Dependencies
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
const PORT = process.env.PORT || 3000;

// Create express app instance.
const app = express();

// Serve static content for the app from the public folder
app.use(express.static("public"));

// Set up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
  //   useUnifiedTopology: true,
  //   useCreateIndex: true,
});

// HTTP request logger middleware
app.use(logger("dev"));

// Give server access to routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Start our server so it can listen for requests from the client
app.listen(PORT, () => {
  // Let us know (server-side) when the server has started
  console.log(`App running on port ${PORT}!`);
});
