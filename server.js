const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const passport = require("passport");
const cookieSession = require("cookie-session");
const cors = require("cors");
var session = require("express-session");

const app = express();

app.use(
  cors({
    origin: "http://localhost:4200", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookie from browser to pass through
  })
);

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser);
app.use(cookieParser());

app.use(
  cookieSession({
    name: "pph-session",
    keys: ["key1", "key2"],
  })
);

// Passport middleware
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./app/config/passport")(passport);

// simple route
app.get("/", (req, res) => {
  res.json({ Message: "Welcome to Project Plan Hub application." });
});

require("./app/routes/user.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/projects.routes")(app);

// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
