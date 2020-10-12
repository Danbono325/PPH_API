const User = require("../models/User.Model");
const Project = require("../models/Projects.Model");
const projectsRoutes = require("../routes/projects.routes");

//Create and save a Project
exports.createProject = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  var isLoggedIn = false;
  if (req.user || req.cookies.jwt) {
    isLoggedIn = true;
  }

  if (isLoggedIn) {
    const project = new Project({
      title: req.body.title,
      description: req.body.description,
      imageURL: req.body.imageURL,
    });

    tags = req.body.tags;

    project.createProject((err, data) => {
      if (err) {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Project",
        });
      } else {
        console.log("DATA: ", data["@ProjectID"]);
        // project.addTags(tags,  data["@ProjectID"], (err, data) => {

        // });
        res.send(data);
      }
    });
  } else {
    console.log("NOT LGOGGED IN");
  }
};
