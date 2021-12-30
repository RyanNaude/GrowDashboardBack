//User Controller

const User = require("../models/user");
const tokenUtil = require("../util/jwtToken");

//User Sign Up Controller
exports.createUser = async (req, res, next) => {
  var token;
  const username = req.body.username;
  const password = req.body.password;

  //Verifying if user already signed up
  User.findOne({ username: username })
    .then((userDoc) => {
      if (userDoc) {
        res.status(409).json({ registerStatus: "Failure" });
        return;
      }
      const user = new User({
        username: username,
        password: password,
      });

      //Adding user to mondo table
      return user.save((err, user) => {
        if (err) throw err;
        token = tokenUtil.genToken(user);
        //Send token to frontend
        res.status(200).json({ registerStatus: "Success", logToken: token });
      });
    })
    .catch((err) => console.log(err));
};

//User Sign In Controller
exports.loginUser = async (req, res, next) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  //Verifying user details from database
  User.findOne({ username: user.username })
    .then((userDoc) => {
      if (userDoc === null || userDoc === undefined) {
        //User email not found
        res.status(401).json({ loginStatus: "User Unknown" });
      } else {
        if (userDoc.password === user.password) {
          //All user details correct
          token = tokenUtil.genToken(user);
          res
            .status(200)
            .json({
              loginStatus: "Success",
              logToken: token,
              userId: user.username,
            });
        } else {
          //User email exists, password entered incorrect
          res.status(401).json({ loginStatus: "User Unknown" });
        }
      }
    })
    .catch((err) => console.log(err));
};

//User sign out controller
exports.logout = async (req, res) => {
  req.logOut();
};
