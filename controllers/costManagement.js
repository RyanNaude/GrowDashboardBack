//Cost Management Controller

const costManagement = require("../models/costManagement");

exports.addDevice = async (req, res, next) => {
  console.log(req.body);
  const newCostManagement = new costManagement({
    devName: req.body.deviceName,
    devAmps: req.body.deviceAmps,
    devVolt: req.body.deviceVolts,
    devWatt: req.body.deviceWatts,
    devHrs: req.body.deviceHours,
    devRate: req.body.deviceRate,
    journalId: req.body.journalId,
  });

  newCostManagement.save((err) => {
    if (!err) {
      console.log("Create new device");
      res.status(201).json({ deviceCreate: "Success" });
    } else {
      console.log(err);
      res.status(401).json({ deviceCreate: "Failure" });
    }
  });
};

exports.getDevice = async (req, res, next) => {
  costManagement.find(function (err, devices) {
    if (err) {
      console.log(err);
      res.status(401).json({ devices: "none" });
    } else {
      console.log(devices);
      res.send(devices);
    }
  });

  console.log("Get Devices on the database");
};
