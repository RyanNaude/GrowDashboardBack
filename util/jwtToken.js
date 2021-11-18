const jwt = require("jsonwebtoken");
const configData = require("../config/environment/development.json");

exports.genToken = (user) => {
    
  var u = {
    userName: user.username,
  };
  return (token = jwt.sign(u, configData.sessionSecret, {
    expiresIn: 60 * 60 * 24, // expires in 24 hours
  }));
};
