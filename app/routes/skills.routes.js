module.exports = (app) => { 
    const skills = require("../controllers/skills.controller.js");

    // GET USERS' SKILLS
    app.get("/skills", skills.getUserSkills);

    // ADD SKILL TO PROFILE
    app.post("/skills", skills.addSkill);

    // REMOVE SKILL TO PROFILE
    app.delete("/skills", skills.removeSkill);

}
