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

// REQUEST TO FOLLOW
exports.followRequest = (req, res) => {
  // Validate request
  checkbody(req);

  User.followRequest(req.body.curUser, req.body.requestedUser, (err, response) => {
    if(err) {
      res.status(500).send({
        message:
          err.message || "An Error occurred.",
      });
    } else {
        res.status(200).send({
          message: 'Request sent'
        });
    }
  }) 
}

// REQUEST TO COLLAB
exports.collabRequest = (req, res) => {
  // Validate request
  checkbody(req);

  User.collabRequest(req.body.curUser, req.body.requestedProject, (err, response) => {
    if(err) {
      res.status(500).send({
        message:
          err.message || "An Error occurred.",
      });
    } else {
        res.status(200).send({
          message: 'Request sent'
        });
    }
  }) 
}

// REQUEST TO MENTOR
exports.mentorRequest = (req, res) => {
  // Validate request
  checkbody(req);

  User.mentorRequest(req.body.curUser, req.body.requestedProject, (err, response) => {
    if(err) {
      res.status(500).send({
        message:
          err.message || "An Error occurred.",
      });
    } else {
        res.status(200).send({
          message: 'Request sent'
        });
    }
  }) 
}

// Accept Follower
exports.acceptFollower = (req, res) => {
  // Validate request
  checkbody(req);

  User.acceptFollower(req.body.reqID, (err, response) => {
    if(err) {
      res.status(500).send({
        message:
          err.message || "An Error occurred.",
      });
    } else {
        res.status(200).send({
          message: 'Follower Acceptor'
        });
    }
  }) 
}

// Accept Collaborator
exports.acceptCollaborator = (req, res) => {
  // Validate request
  checkbody(req);

  User.acceptCollaborator(req.body.reqID, (err, response) => {
    if(err) {
      res.status(500).send({
        message:
          err.message || "An Error occurred.",
      });
    } else {
        res.status(200).send({
          message: 'Collaborator Acceptor'
        });
    }
  }) 
}

// Accept Mentor
exports.acceptMentor = (req, res) => {
  // Validate request
  checkbody(req);

  User.acceptMentor(req.body.reqID, (err, response) => {
    if(err) {
      res.status(500).send({
        message:
          err.message || "An Error occurred.",
      });
    } else {
        res.status(200).send({
          message: 'Mentor Acceptor'
        });
    }
  }) 
}

// Reject Follower
exports.rejectFollower = (req, res) => {
  // Validate request
  checkbody(req);

  User.rejectFollower(req.body.reqID, (err, response) => {
    if(err) {
      res.status(500).send({
        message:
          err.message || "An Error occurred.",
      });
    } else {
        res.status(200).send({
          message: 'Follower Rejected'
        });
    }
  }) 
}

// Reject Collaborator / Mentor
exports.rejectCollMen = (req, res) => {
  // Validate request
  checkbody(req);

  User.rejectCollMen(req.body.reqID, (err, response) => {
    if(err) {
      res.status(500).send({
        message:
          err.message || "An Error occurred.",
      });
    } else {
        res.status(200).send({
          message: 'Collaborator / Mentor Rejected'
        });
    }
  }) 
}
