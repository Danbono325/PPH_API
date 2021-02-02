const sql = require("./db");

class Skills {
    constructor(skill) {
        this.idTag = skill.idTag;
        this.skill = skill.name;
    }

    // GET ALL OF A USER'S SKILLS
    getUserSkills(idUsers, result) {
        sql.query(`SELECT idTag, tag_title FROM tags s JOIN user_skills u ON s.idTag = u.tags_idTag WHERE u.users_idUsers = ?`, idUsers, (err, res) => {
            if(err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }
            console.log("skills ", res);
            result(null, res);
        })
    }

    // ADD SKILL
    addSkill(curId, result) {
      var fields = [curId, this.skill];
        sql.query(`CALL addUserSkill(?, ?);`, fields, (err, res) => {
            if(err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }
            result(null, res[0]);
        })
    }

    // REMOVE SKILL
    removeSkill(curId, result) {
        var fields = [curId, this.idTag];
          sql.query(`CALL removeUserSkill(?, ?);`, fields, (err, res) => {
              if(err) {
                  console.log("Error: ", err);
                  result(err, null);
                  return;
              }
              result(null, res);
          })
      }

}

module.exports = Skills;