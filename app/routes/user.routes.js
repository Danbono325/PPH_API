const passport = require("passport");

module.exports = (app) => {
  const users = require("../controllers/user.controller.js");

  // Create a new User
  app.post("/users", users.create);

  // Sign in with Google
  // GET /google
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  The first step in Google authentication will involve
  //   redirecting the user to google.com.  After authorization, Google
  //   will redirect the user back to this application at /auth/google/callback
  app.get(
    "/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  // GET /google/callback
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  If authentication fails, the user will be redirected back to the
  //   login page.  Otherwise, the primary route function function will be called,
  //   which, in this example, will redirect the user to the home page.
  app.get(
    "/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/",
      // successRedirect: "/success",
    }),
    function (req, res) {
      res.redirect("/success");
    }
  );
};
