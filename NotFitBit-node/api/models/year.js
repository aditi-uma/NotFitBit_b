const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const yearSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  year: {
    type: Number,
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

  "01": {
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
  },
  "02": {
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
  },
  "03": {
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
  },
  "04": {
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
  },
  "05": {
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
  },
  "06": {
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
  },
  "07": {
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
  },
  "08": {
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
  },
  "09": {
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
  },
  10: {
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
  },
  11: {
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
  },
  12: {
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
  },
});

module.exports = mongoose.model("years", yearSchema);
