module.exports = (app) => { 
    const skills = require("../controllers/skills.controller.js");

    // GET USERS' SKILLS
    app.get("/skills", skills.getUserSkills);

    // ADD SKILL TO PROFILE

    // REMOVE SKILL TO PROFILE
}
