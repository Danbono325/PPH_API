const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
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
          newUser: false,
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
            const existingUser = new User({
              idUsers: user.idUsers,
              newUser: false,
              email: user.email,
              username: user.username,
            });
            return done(null, existingUser);
          } else {
            // Redirect to ask for username
            // ADD USER IN OUR DB
            // return done(null, { email: userSign.email });
            userSign.newUser = true;
            return done(null, userSign);
          }
        });
      }
    )
  );

  // Github oauth
  passport.use(
    new GitHubStrategy(
      {
        clientID: "71ea2d964ad26423bd2a",
        clientSecret: "4404c755c277a4df3e0bf86d26b55ca3e4f9e900",
        callbackURL: "http://localhost:3000/github/callback",
        scope: ["user:email"],
      },
      function (accessToken, refreshToken, profile, done) {
        // User.findOrCreate({ githubId: profile.id }, function (err, user) {
        //   return done(err, user);
        // });
        // console.log(profile);
        console.log("INSIDE STRAT");
        const userSign = new User({
          email: profile.emails[0].value,
          username: profile.username,
          newUser: false,
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
            const existingUser = new User({
              idUsers: user.idUsers,
              newUser: false,
              email: user.email,
              username: user.username,
            });
            console.log("EXISTING USER: ", existingUser);
            return done(null, existingUser);
          } else {
            userSign.newUser = true;
            return done(null, userSign);
          }
        });
      }
    )
  );

  passport.serializeUser((user, done) => {
    console.log(user);
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    console.log("INSIDE DESERIALIZE", user);
    if (user.newUser) {
      done(null, user);
    } else {
      // console.log("USERS user.IdUsers: ", user);
      User.findById(user.idUsers, (err, foundUser) => {
        if (err)
          // res.status(500).send({
          //   message:
          //     err.message || "Some error occurred while creating the User.",
          // });
          console.log("err", err);
        else {
          done(null, user);
        }
      });
    }
  });
};
