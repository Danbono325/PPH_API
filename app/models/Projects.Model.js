const sql = require("./db");

class Project {
  constructor(project) {
    this.idProjects = project.idProjects;
    this.title = project.title;
    this.description = project.description;
    this.helpWanted = project.helpWanted;
    this.isCompleted = project.isCompleted;
    this.websiteLink = project.websiteLink;
    this.imageURL = project.imageURL;
  }

  createProject(result) {
    const fields = [this.title, this.description, this.imageURL];
    const query = `CALL CreateProject(?, ?, ?)`;
    // console.log("PROJECT: ", this);
    sql.query(query, fields, (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }
      console.log("Created Project: ", { id: res.insertId, ...this });
      result(null, res[0][0]);
    });
  }

  // addTags(tags, projectId, result) {
  //   //STORED PROCEDURE for adding tags to tag table and the project_tags
  // }
}
module.exports = Project;
