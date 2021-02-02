const Skills = require("../models/Skills.Model");

function checkbody(req) {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
  }

exports.getUserSkills = (req, res) => {
    // Validate request
    checkbody(req);

    const id = req.body.idUsers;

    const skill = new Skills({ name: null });

    // Save Customer in the database
    skill.getUserSkills(id, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while getting the user's skills."
        });
        else res.send(data);
    });
}

exports.addSkill = (req, res) => {

}

exports.removeSkill = (req, res) => {
    
}