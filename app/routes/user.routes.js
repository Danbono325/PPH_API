const passport = require("passport");

module.exports = (app) => {
  const users = require("../controllers/user.controller.js");

  // Create a new User
  app.post("/createUser", users.create);
};
