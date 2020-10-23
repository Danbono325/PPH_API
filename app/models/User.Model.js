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



  // FOLLOW A ANOTHER USER
  static followUser(curId, id, result) {
    const fields = [curId, id];
    sql.query("CALL followUser(?, ?);", fields, (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err);
        return;
      }
      // console.log("res", result);
      result(null);
    });
  }

  // GET ALL FOLLOWING 
  static getFollowers(id, result) {
    sql.query("SELECT idUsers, username FROM users u JOIN following f ON u.idUsers = f.users_idUsers WHERE following = ?;", id, (err, res) => {
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
    sql.query("SELECT idUsers, username FROM users u JOIN following f ON f.following = u.idUsers WHERE f.users_idUsers = ?;", id, (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }
      result(null, res);
    });
  }
}

module.exports = User;
