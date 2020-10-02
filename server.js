const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const cookieSession = require("cookie-session");
const cors = require("cors");

const app = express();

app.use(function (req, res, next) {
  var allowedOrigins = [
    "http://localhost:4200",
    "https://hawksbaseballpitchplus.csse-projects.monmouth.edu",
  ];
  var origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
  res.header("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  return next();
});

app.use(cors());

require("./app/config/passport")(passport);

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "pph-session",
    keys: ["key1", "key2"],
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// simple route
app.get("/", (req, res) => {
  res.json({ Message: "Welcome to Project Plan Hub application." });
});

require("./app/routes/user.routes")(app);
require("./app/routes/auth.routes")(app);

// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
