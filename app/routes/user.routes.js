module.exports = (app) => {
  const users = require("../controllers/user.controller.js");

  // Create a new User (Register) -- NEED TO ADD PASSPORT TO GET JWT TOKEN ON SUCCESSFULL LOGIN
  app.post("/users", users.create);

  // DELETE ACCOUNT

  // UPDATE ACCOUNT

  // GET ACCOUNT

  // Get followers
  app.get("/followers", users.getFollowers);

  // Get following
  app.get("/following", users.getFollowing);

  // Get Follower Status
  app.get("/followerStatus", users.getFollowerStatus);

  // Get CollMen Status
  app.get("/collMenStatus", users.getCollMenStatus);

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
