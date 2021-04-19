const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("..//models/user");

router.post("/", (req, res, next) => {
  //console.log(req.file);
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
  });
  user
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "User created successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.get("/", (req, res, next) => {
  User.find()
    .exec()
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.patch("/:name/:height/:weight", (req, res, next) => {
  User.updateOne(
    { username: "User1" },
    {
      name: req.params.name,
      height: req.params.height,
      weight: req.params.weight,
    }
  )
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "User details updated successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
