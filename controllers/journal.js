const Journal = require("../models/journal");

exports.getJournals = async (req, res, next) => {
  Journal.find(function (err, journals) {
    if (err) {
      console.log(err);
    } else {
      res.send(journals);
    }
  });
};

exports.createJournal = async (req, res, next) => {
  const newJournal = new Journal({
    name: req.body.journalNameField,
    description: req.body.journalDescField,
    roomType: req.body.journalRoomType,
    waterType: req.body.journalWaterType,
    vegLight: req.body.journalVegLight,
    flowLight: req.body.journalFlowLight,
    vegWatt: req.body.journalVegWatt,
    flowerWatt: req.body.journalFlowerWatt,
    growMedium: req.body.journalGrowMedium,
    activeJournal: true,
    journalUsername: req.body.journalUsername,
  });

  newJournal.save((err) => {
    if (!err) {
      res.status(201).json({ message: "Success" });
      // res.statusCode = 200;
      // res.send({ journalCreate: "Success" });
    } else {
      res.status(401).json({ journalCreate: "Failure" });
      // res.send("Problems Problems Problems");
      console.log(err);
    }
  });
};
