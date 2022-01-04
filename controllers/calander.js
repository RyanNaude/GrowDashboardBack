//Journal Controller

const Calander = require("../models/calander");

//Create new Journal
exports.createCalanderEntry = async (req, res, next) => {
  const newCalEntry = new Calander({
    title: req.body.title,
    date: req.body.date,
    start: req.body.start,
    end: req.body.end,
    type: req.body.type,
    notes: req.body.notes,
  });

  newJournal.save((err) => {
    if (!err) {
      res.status(201).json({ journalCreate: "Success" });
    } else {
      console.log(err);
      res.status(401).json({ journalCreate: "Failure" });
    }
  });
};
