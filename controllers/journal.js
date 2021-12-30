//Journal Controller

const Journal = require("../models/journal");

//Get journals on database
exports.getJournals = async (req, res, next) => {
  Journal.find(function (err, journals) {
    if (err) {
      console.log(err);
      res.status(401).json({ journal: "none" });
    } else {
      res.send(journals);
    }
  });
};

//Update existing Journal
exports.updateJournal = async (req, res, next) => {
  let journal = null;

  try {
    //Return existing record from BD
    journal = await Journal.findOne({
      _id: req.body.journalId,
    });

    //If record found update with req.body data
    if (journal) {
      (journal.name = journal.name = req.body.journalNameField),
        (journal.description = req.body.journalDescField),
        (journal.roomType = req.body.journalRoomType),
        (journal.waterType = req.body.journalWaterType),
        (journal.vegWatt = req.body.journalVegWatt),
        (journal.vegLight = req.body.journalVegLight),
        (journal.flowerWatt = req.body.journalVegWatt),
        (journal.flowLight = req.body.journalFlowLight),
        (journal.growMedium = req.body.journalGrowMedium),
        //Update record on DB
        await journal.save();
      res.status(201).json({ journalUpdate: "Success" });
    } else {
      // console.log("Error");
      res.status(401).json({ journalUpdate: "Failure" });
    }
  } catch (err) {
    console.log(err);
  }
};

//Create new Journal
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
      res.status(201).json({ journalCreate: "Success" });
    } else {
      console.log(err);
      res.status(401).json({ journalCreate: "Failure" });
    }
  });
};
