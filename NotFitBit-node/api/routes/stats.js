const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("..//models/user");
const Year = require("..//models/year");
const Day = require("..//models/day");
let ht = 175;
let wt = 60;

router.post("/:date/:steps", (req, res, next) => {
  User.findOne({ username: "User1" })
    .exec()
    .then((doc) => {
      ht = doc.height;
      wt = doc.weight;
      console.log("User found");
    })
    .catch((err) => {
      console.log("User not found");
    });

  var month = req.params.date.substring(4, 6);
  var year = req.params.date.substring(0, 4);

  Day.findOne({ date: Number(req.params.date) })
    .exec()
    .then((doc) => {
      var steps = Math.trunc(Number(doc.steps) + Number(req.params.steps));
      var cals = Math.trunc(
        doc.calories +
          (wt * 1.036 * ht * 0.45 * Number(req.params.steps)) / 1000
      );
      var dist = Math.trunc(
        doc.distance + (ht * 0.45 * Number(req.params.steps)) / 1000
      );

      Day.updateOne(
        { date: Number(req.params.date) },
        { steps: steps, calories: Number(cals), distance: dist }
      )
        .exec()
        .then((result) => {
          res.status(201).json({
            message: "Day updated successfully",
          });
          Year.findOne({ year: year })
            .exec()
            .then((doc) => {
              doc.steps = Number(doc.steps) + Number(req.params.steps);
              doc.calories = Math.trunc(
                doc.calories +
                  (wt * 1.036 * ht * 0.45 * Number(req.params.steps)) / 1000
              );
              doc.distance = Math.trunc(
                doc.distance + (ht * 0.45 * Number(req.params.steps)) / 1000
              );
              doc[month].steps = doc[month].steps + Number(req.params.steps);
              doc[month].calories = Math.trunc(
                doc[month].calories +
                  (wt * 1.036 * ht * 0.45 * Number(req.params.steps)) / 1000
              );
              doc[month].distance = Math.trunc(
                doc[month].distance +
                  (ht * 0.45 * Number(req.params.steps)) / 1000
              );
              doc
                .save()
                .then((result) => console.log(result))
                .catch((err) => console.log("Issue with saving"));
            })
            .catch((err) => {
              const nyear = new Year({
                _id: new mongoose.Types.ObjectId(),
                year: year,
                distance: Math.trunc(
                  (ht * 0.45 * Number(req.params.steps)) / 1000
                ),
                calories: Math.trunc(
                  (wt * 1.036 * ht * 0.45 * Number(req.params.steps)) / 1000
                ),
                [month]: {
                  steps: Number(req.params.steps),
                  distance: Math.trunc(
                    (ht * 0.45 * Number(req.params.steps)) / 1000
                  ),
                  calories: Math.trunc(
                    (wt * 1.036 * ht * 0.45 * Number(req.params.steps)) / 1000
                  ),
                },
              });

              nyear
                .save()
                .then((result) => console.log(result))
                .catch((err) => {
                  console.log("Issue with creating");
                  console.log(err);
                });
            });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ error: err });
        });
    })
    .catch((err) => {
      console.log("day not found");
      const day = new Day({
        _id: new mongoose.Types.ObjectId(),
        date: req.params.date,
        steps: req.params.steps,
        calories: Math.trunc(
          (Number(wt) * 1.036 * Number(ht) * 0.45 * Number(req.params.steps)) /
            1000
        ),

        distance: Math.trunc(
          Number(ht * 0.45 * Number(req.params.steps)) / 1000
        ),
      });
      day
        .save()
        .then((result) => {
          console.log(result);
          res.status(201).json({
            message: "Day created successfully",
          });
          Year.findOne({ year: year })
            .exec()
            .then((doc) => {
              doc.steps = Number(doc.steps) + Number(req.params.steps);
              doc[month].steps = doc[month].steps + Number(req.params.steps);
              doc.calories = Math.trunc(
                doc.calories +
                  (wt * 1.036 * ht * 0.45 * Number(req.params.steps)) / 1000
              );
              doc.distance = Math.trunc(
                doc.distance + (ht * 0.45 * Number(req.params.steps)) / 1000
              );
              doc[month].calories = Math.trunc(
                doc[month].calories +
                  (wt * 1.036 * ht * 0.45 * Number(req.params.steps)) / 1000
              );
              doc[month].distance = Math.trunc(
                doc[month].distance +
                  (ht * 0.45 * Number(req.params.steps)) / 1000
              );
              doc
                .save()
                .then((result) => console.log(result))
                .catch((err) => console.log("Issue with saving"));
            })
            .catch((err) => {
              const nyear = new Year({
                _id: new mongoose.Types.ObjectId(),
                year: year,
                steps: Number(req.params.steps),
                distance: Math.trunc(
                  (ht * 0.45 * Number(req.params.steps)) / 1000
                ),
                calories: Math.trunc(
                  (wt * 1.036 * ht * 0.45 * Number(req.params.steps)) / 1000
                ),
                [month]: {
                  steps: Number(req.params.steps),
                  distance: Math.trunc(
                    (ht * 0.45 * Number(req.params.steps)) / 1000
                  ),
                  calories: Math.trunc(
                    (wt * 1.036 * ht * 0.45 * Number(req.params.steps)) / 1000
                  ),
                },
              });

              nyear
                .save()
                .then((result) => console.log(result))
                .catch((err) => {
                  console.log("Issue with creating");
                  console.log(err);
                });
            });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ error: err });
        });
    });
});

router.get("/:date/day", (req, res, next) => {
  Day.findOne({ date: Number(req.params.date) })
    .exec()
    .then((doc) => {
      console.log(doc.date);
      const response = {
        steps: doc.steps,
        calories: doc.calories,
        distance: doc.distance,
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});
router.get("/:date/month", (req, res, next) => {
  var month = req.params.date.substring(4, 6);
  var year = req.params.date.substring(0, 4);
  Year.findOne({ year: year })
    .exec()
    .then((doc) => {
      const response = {
        steps: doc[month].steps,
        calories: doc[month].calories,
        distance: doc[month].distance,
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.get("/:date/year", (req, res, next) => {
  var month = req.params.date.substring(4, 6);
  var year = req.params.date.substring(0, 4);
  Year.findOne({ year: year })
    .exec()
    .then((doc) => {
      const response = {
        steps: doc.steps,
        calories: doc.calories,
        distance: doc.distance,
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

module.exports = router;
