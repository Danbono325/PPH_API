const User = require("../models/User.Model");
const bcrypt = require("bcrypt");
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
    password: req.body.password,
    username: req.body.username,
  });

  // Hash password
  bcrypt.genSalt(10, (err, salt) =>
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) throw err;
      // Set password to hashed
      user.password = hash;
      // Save User in the database
      user.create((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the User.",
          });
        else res.send(data);
      });
    })
  );
};
