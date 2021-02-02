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
    // Validate request
    checkbody(req);

    const newSkill = req.body.newSkill;
    const curId = req.body.curId;

    const skill = new Skills({ name: newSkill });

    // Save Customer in the database
    skill.addSkill(curId, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while adding to the user's skills."
        });
        else res.send(data);
    });
}

exports.removeSkill = (req, res) => {
       // Validate request
       checkbody(req);

       const id = req.body.idTag;
       const curId = req.body.curId;
   
       const skill = new Skills({ idTag: id });
   
       // Save Customer in the database
       skill.removeSkill(curId, (err, data) => {
           if (err)
           res.status(500).send({
               message:
               err.message || "Some error occurred while adding to the user's skills."
           });
           else res.send(data);
       });
}