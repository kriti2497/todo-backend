const { Schema, model } = require("mongoose");

const TodoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ["todo", "in-progress", "done"],
  },
});

module.exports = model("todo", TodoSchema);
