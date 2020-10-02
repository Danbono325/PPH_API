const passport = require("passport");

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

module.exports = (app) => {
  app.get("/success", (req, res) => {
    // res.send(req);

    console.log(req);
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies,
    });
    // res.redirect("http://localhost:4200");
  });

  app.get("/logout", (req, res) => {
    req.session = null;
    req.logout();
    res.redirect("/");
  });

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
    }),
    function (req, res) {
      console.log("req.user", req.user);
      res.redirect("/success");
    }
  );

  // GITHUB ROUTES
  app.get("/github", passport.authenticate("github"));

  app.get(
    "/github/callback",
    passport.authenticate("github", {
      failureRedirect: "/",
      // successRedirect: "http://localhost:4200",
    }),
    function (req, res) {
      // Successful authentication, redirect home.
      res.redirect("/success");
      // console.log(req.user);
    }
  );
};
