const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const costManagementSchema = new Schema({
  devName: {
    type: String,
    required: [true, "Device Name is required"],
  },
  devAmps: {
    type: Number,
    required: [true, "Device Amperage is required"],
  },
  devVolt: {
    type: Number,
    required: [true, "Device Voltage is required"],
  },
  devWatt: {
    type: Number,
    required: [true, "Device Wattage is required"],
  },
  devHrs: {
    type: Number,
    required: [true, "Device's 'On' hours is required"],
  },
  devRate: {
    type: Number,
    required: [true, "Electricity rate is required"],
  },
  journalId: {
    type: Number,
    required: [true, "Journal ID is required"],
  },
});

module.exports = mongoose.model("costManagement", costManagementSchema);
