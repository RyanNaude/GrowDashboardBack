const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const journalSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  roomType: {
    type: String,
    required: [true, "roomType is required"],
  },
  waterType: {
    type: String,
    required: [true, "waterType is required"],
  },
  vegWatt: {
    type: String,
    required: [true, "veg Wattage is required"],
  },
  vegLight: {
    type: String,
    required: [true, "vegLight is required"],
  },
  flowerWatt: {
    type: String,
    required: [true, "Flower Wattage is required"],
  },
  flowLight: {
    type: String,
    required: [true, "flowLight is required"],
  },
  growMedium: {
    type: Array,
    required: [true, "Grow Medium is required"],
  },
  activeJournal: {
    type: Boolean,
    required: [true, "Journal Active is required"],
  },
  journalUsername: {
    type: String,
    required: [true, "Journal Username is required"],
  },
});

module.exports = mongoose.model("Journal", journalSchema);
