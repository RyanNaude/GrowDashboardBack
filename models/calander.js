const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const calanderSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  date: {
    type: Date,
    required: [true, "Date is required"],
  },
  start: {
    type: String,
    required: [true, "Start Time is required"],
  },
  end: {
    type: String,
    required: [true, "End Time is required"],
  },
  type: {
    type: String,
    required: [true, "Type is required"],
  },
  notes: {
    type: String,
    required: [true, "Notes is required"],
  },
});

module.exports = mongoose.model("Calander", calanderSchema);
