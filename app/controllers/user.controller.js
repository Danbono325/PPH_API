const User = require("../models/User.Model");
const bcrypt = require("bcrypt");

function checkbody(req) {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
}

// Create and Save a new USer
exports.create = (req, res) => {
  // Validate request
  checkbody(req);

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

// FOLLOW A USER
exports.followUser = (req, res) => {
  // Validate request
  checkbody(req);

  // Check follow user is in DB
  User.findById(req.body.folUser, (err, foundUser) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "User not found.",
      });
    }
    else {
      // Check follow user is in DB
      User.findById(req.body.curUser, (err, foundUser) => {
        if (err) {
          res.status(500).send({
            message:
              err.message || "User not found.",
          });
        }
        else {
          // Both Users found curUser calls followUser
          User.followUser(req.body.curUser, req.body.folUser, (err) => {
            if(err) {
              res.status(500).send({
                message:
                  err.message || "An Error occurred.",
              });
            } else {
              res.send({
                message: "User followed.",
              })
            }
          });
        }
      });
    }
  });
}

// GET ALL FOLLOWERS
exports.getFollowers = (req, res) => {
  // Validate request
  checkbody(req);

  User.getFollowers(req.body.curUser, (err, response) => {
    if(err) {
      res.status(500).send({
        message:
          err.message || "An Error occurred.",
      });
    } else {
      if(response.length == 0) 
        res.status(200).send({
          message:
            "No followers yet.",
        });
      else res.status(200).send(response);
    }
  }) 

}

// GET ALL FOLLOWING
exports.getFollowing = (req, res) => {
  // Validate request
  checkbody(req);

  User.getFollowing(req.body.curUser, (err, response) => {
    if(err) {
      res.status(500).send({
        message:
          err.message || "An Error occurred.",
      });
    } else {
      if(response.length == 0) 
        res.status(200).send({
          message:
            "Follow some users.",
        });
      else res.status(200).send(response);
    }
  }) 

}
