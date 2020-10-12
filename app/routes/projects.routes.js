const passport = require("passport");

module.exports = (app) => {
  const project = require("../controllers/projects.controller.js");

  // Create a new Project
  app.post("/createProject", project.createProject);
};
