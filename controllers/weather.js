//Weather Controller

const https = require("https");
const configData = require("../config/environment/development.json");
const weatherAPIKey = configData.weatherAPI;

exports.getWeather = async (req, res) => {
  const apiCallURL = req.body.weatherAPI + weatherAPIKey;
  https.get(apiCallURL, (response) => {
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      res.send(JSON.stringify(weatherData));
    });
  });
};
