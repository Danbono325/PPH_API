const passport = require("passport");

module.exports = (app) => {
  const users = require("../controllers/user.controller.js");

  // Create a new User
  app.post("/createUser", users.create);

  // Get followers
  app.get("/followers", users.getFollowers);

  // Get following
  app.get("/following", users.getFollowing);

  // Request to follow
  app.post("/followRequest", users.followRequest);

  // Request to collab
  app.post("/collabRequest", users.collabRequest);

  // Request to mentor
  app.post("/mentorRequest", users.mentorRequest);

  // Accept a follower
  app.post("/acceptFollower", users.acceptFollower);

  // Accept a colloborator
  app.post("/acceptCollaborator", users.acceptCollaborator);

  // Accept a mentor
  app.post("/acceptMentor", users.acceptMentor);

  // Reject Follower
  app.delete("/rejectFollower", users.rejectFollower);

  // Reject Collaborator/Mentor
  app.delete("/rejectCollMen", users.rejectCollMen);
};
