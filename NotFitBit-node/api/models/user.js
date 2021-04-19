const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,

  username: {
    type: String,
    default: "User1",
  },
  name: {
    type: String,
    default: "User1",
  },
  height: {
    type: Number,
    default: 175,
  },
  weight: {
    type: Number,
    default: 60,
  },
});

module.exports = mongoose.model("User", userSchema);
