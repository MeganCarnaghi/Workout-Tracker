// Required Dependencies
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");

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

// Connect to the database
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
//   useNewUrlParser: true,
//   useFindAndModify: false,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
// });

const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://carnagh5:Spartan6@cluster0.krsxo.mongodb.net/workout?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect((err) => {
  const collection = client.db("workout").collection("workouts");
  // perform actions on the collection object
  client.close();
});

// HTTP request logger middleware
app.use(logger("dev"));

// Give server access to routes
app.use(require("./routes/apiRoutes.js"));
app.use(require("./routes/htmlRoutes.js"));

// Start our server so it can listen for requests from the client
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
