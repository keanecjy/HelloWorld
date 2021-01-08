const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create User schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  lat: {
    type: String,
  },
  long: {
    type: String,
  },
  lastText: {
    type: String,
  },
});

// Exports the model using the specified Schema
module.exports = mongoose.model("users", UserSchema);
