const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/User.Model");

module.exports = function (passport) {
  // Use the GoogleStrategy within Passport.
  //   Strategies in Passport require a `verify` function, which accept
  //   credentials (in this case, an accessToken, refreshToken, and Google
  //   profile), and invoke a callback with a user object.
  passport.use(
    new GoogleStrategy(
      {
        clientID:
          "329154620304-vck1rojaafkps9mcldgnr6q3oml5pjgj.apps.googleusercontent.com",
        clientSecret: "52yTKVtNJO47wWmWJe8-3aQ9",
        callbackURL: "http://localhost:3000/google/callback",
      },
      function (accessToken, refreshToken, profile, done) {
        // console.log("Profile", profile);

        const userSign = new User({
          email: profile._json.email,
          username: profile._json.name,
        });

        userSign.checkUser((err, user) => {
          if (err) {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the User.",
            });
          }

          if (user) {
            // Login
            return done(null, user);
          } else {
            // CREATE USER IN OUR DB
            // return done(null, { email: userSign.email });
            return done(null, userSign);
          }
        });

        // user.create((err, data) => {
        //   if (err) {
        //     // res.status(500).send({
        //     //   message:
        //     //     err.message || "Some error occurred while creating the USer.",
        //     // });
        //     console.log(err);
        //   } else console.log(data);
        //   // res.send(data);
        // });
        // return done(err, user);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.idUsers);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      if (err)
        // res.status(500).send({
        //   message:
        //     err.message || "Some error occurred while creating the User.",
        // });
        console.log("err", err);
      else done(null, user);
    });
  });
};
