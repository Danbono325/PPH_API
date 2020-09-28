const User = require("../models/User.Model");

// Create and Save a new USer
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a User
  const user = new User({
    email: req.body.email,
    // !!! NEED TO ENCRPYT PASSWORD
    password: req.body.password,
    username: req.body.username,
  });

  // Save User in the database
  user.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the USer.",
      });
    else res.send(data);
  });
};
