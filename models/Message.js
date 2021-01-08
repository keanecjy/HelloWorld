const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create User schema
const MessageSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  text: {
    type: String,
  },
});

// Exports the model using the specified Schema
module.exports = mongoose.model("messages", MessageSchema);
