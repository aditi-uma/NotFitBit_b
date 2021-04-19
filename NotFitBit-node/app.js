const express = require("express");
const mongoose = require("mongoose");
const app = express();
const morgan = require("morgan");
const bodyParse = require("body-parser");
const StatRoutes = require("./api/routes/stats.js");

const UserRoutes = require("./api/routes/user.js");

const bodyParser = require("body-parser"); //to parse our request body

mongoose
  .connect(
    "mongodb+srv://aditi:authaditi@notfitbitcluster.235vn.mongodb.net/NotFitBitDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MOngoose connected"))
  .catch((err) => {
    console.log(err);
  });

mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-ALlow-Origin");
  res.header(
    "Access-Control-ALlow-Headers",
    "Origin, X-Requested-With, Content-Type,Accept,Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/stats", StatRoutes);

app.use("/user", UserRoutes);

app.use((req, res, next) => {
  const error = new Error("not found");
  error.status = 404;
  next(error);
});
app.get("/", (req, res, next) => {
  res.status(201).json({
    message: "Workng",
  });
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
