const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const cookieSession = require("cookie-session");
const cors = require("cors");

const app = express();

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
