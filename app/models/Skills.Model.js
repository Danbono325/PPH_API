const sql = require("./db");

class Skills {
    constructor(skill) {
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

}

module.exports = Skills;