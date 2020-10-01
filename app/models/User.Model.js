const sql = require("./db");

class User {
  constructor(user) {
    this.idUsers = user.idUsers;
    this.newUser = user.newUser;
    this.email = user.email;
    this.password = user.password;
    this.username = user.username;
  }

  create(result) {
    sql.query("INSERT INTO users SET ?", this, (err, res) => {
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
    sql.query("SELECT * FROM users WHERE idUsers = ?", id, (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      result(null, res[0]);
    });
  }
}

module.exports = User;
