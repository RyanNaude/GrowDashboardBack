const User = require("../models/user");
const passport = require("passport");

console.log(User);

exports.createUser = async (req, res, next) => {
  // Using passport to register users on the database
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    function (err, user) {
      if (err) {
        res.send("Problems Problems Problems");
        console.log(err);
        console.log("----------------------------------------");
      }
      passport.authenticate("local")(req, res, function () {
        res.header("set-cookie", "register=true");
        res.send("API is working properly");
      });
    }
  );
};

exports.loginUser = async (req, res, next) => {
  console.log("This is a login user test");
  console.log(req.body);

  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  // passport.serializeUser(User.serializeUser());
  // passport.deserializeUser(User.deserializeUser());

  req.login(user, function (err) {
    if (err) {
      console.log("This is an Error");
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function () {
        //Generating token
        const token = jwt.sign(
          { email: req.body.username },
          "SuperSecretKeySuperSecretKey",
          { expiresIn: "1h" }
        );
        res.status(200).json({ token: token, userId: user.username });
      });
    }
  });
};

exports.logout = async (req, res) => {
  req.logOut();
};
