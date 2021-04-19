const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const daySchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  date: {
    type: Number,
    //required:true
  },
  steps: {
    type: Number,
    default: 0,
  },
  calories: {
    type: Number,
    default: 0,
  },
  distance: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Days", daySchema);
