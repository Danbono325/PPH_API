const passport = require("passport");

module.exports = (app) => {
  const users = require("../controllers/user.controller.js");

  // Create a new User
  app.post("/createUser", users.create);

  // Follow another User
  app.post("/followUser", users.followUser);

  // Get followers
  app.get("/followers", users.getFollowers);

  // Get following
  app.get("/following", users.getFollowing);

  // Request to follow
  app.post("/followRequest", users.followRequest);

  // Request to collab
  app.post("/collabRequest", users.collabRequest);

  // // Request to mentor
  app.post("/mentorRequest", users.mentorRequest);
};
