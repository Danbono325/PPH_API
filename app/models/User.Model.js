const sql = require("./db");
const jwt = require("jsonwebtoken");

class User {
  constructor(user) {
    this.idUsers = user.idUsers;
    this.newUser = user.newUser;
    this.email = user.email;
    this.password = user.password;
    this.username = user.username;
  }

  create(result) {
    const fields = [this.email, this.username, this.password];
    const query = `INSERT INTO users (email, username, password) VALUES (?, ?, ?)`;
    sql.query(query, fields, (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }
      console.log("Created User: ", { id: res.insertId, ...this });

      result(null, { id: res.insertId, ...this });
    });
  }

  checkUser(result) {
    sql.query("SELECT * FROM users WHERE email = ?", this.email, (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      result(null, res[0]);
    });
  }

  static findById(id, result) {
    console.log("ID IS: ", id);
    sql.query("SELECT * FROM users WHERE idUsers = ?", id, (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      result(null, res[0]);
    });
  }

  // GET ALL FOLLOWING 
  static getFollowers(id, result) {
    sql.query("SELECT idUsers, username FROM users u JOIN following f ON f.following = u.idUsers WHERE f.users_idUsers = ?;", id, (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }
      result(null, res);
    });
  }

  // GET ALL FOLLOWING
  static getFollowing(id, result) {
    sql.query("SELECT idUsers, username FROM users u JOIN following f ON u.idUsers = f.users_idUsers WHERE following = ?;", id, (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }
      result(null, res);
    });
  }

  
  // FOLLOW REQUEST
  // COLLAB REQUEST
  // MENTOR REQUEST

    // REQUEST TO FOLLOW
    static followRequest(curId, id, result) {
      var fields = [curId, id];
      sql.query("CALL followRequest(?, ?);", fields, (err, res) => {
        if (err) {
          console.log("Error: ", err);
          result(err, null);
          return;
        }
        result(null, res);
      });
    }

    // REQUEST TO COLLAB
    static collabRequest(curId, id, result) {
      var fields = [curId, id];
      sql.query("CALL collabRequest(?, ?);", fields, (err, res) => {
        if (err) {
          console.log("Error: ", err);
          result(err, null);
          return;
        }
        result(null, res);
      });
    }

    // REQUEST TO MENTOR
    static mentorRequest(curId, id, result) {
      var fields = [curId, id];
      sql.query("CALL mentorRequest(?, ?);", fields, (err, res) => {
        if (err) {
          console.log("Error: ", err);
          result(err, null);
          return;
        }
        result(null, res);
      });
    }

    // ACCEPT FOLLOWER
  static acceptFollower(reqID, result) {
    sql.query("CALL acceptFollower(?);", reqID, (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err);
        return;
      }
      // console.log("res", result);
      result(null);
    });
  }

    // ACCEPT COLLABORATOR
    static acceptCollaborator(reqID, result) {
      sql.query("CALL acceptCollaborator(?);", reqID, (err, res) => {
        if (err) {
          console.log("Error: ", err);
          result(err);
          return;
        }
        // console.log("res", result);
        result(null);
      });
    }

    // ACCEPT MENTOR
    static acceptMentor(reqID, result) {
      sql.query("CALL acceptMentor(?);", reqID, (err, res) => {
        if (err) {
          console.log("Error: ", err);
          result(err);
          return;
        }
        // console.log("res", result);
        result(null);
      });
    }

    // REJECT FOLLOWER
    static rejectFollower(reqID, result) {
      sql.query("DELETE FROM follow_requests WHERE id = ?;", reqID, (err, res) => {
        if (err) {
          console.log("Error: ", err);
          result(err);
          return;
        }
        // console.log("res", result);
        result(null);
      });
    }

    //REJECT COLLABORATOR / MENTOR
    static rejectCollMen(reqID, result) {
      sql.query("DELETE FROM collab_requests WHERE idcollab_requests = ?;", reqID, (err, res) => {
        if (err) {
          console.log("Error: ", err);
          result(err);
          return;
        }
        // console.log("res", result);
        result(null);
      });
    }
}

module.exports = User;
