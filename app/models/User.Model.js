const sql = require("./db");

class User {
  constructor(user) {
    this.email = user.email;
    this.password = user.password;
    this.username = user.username;
  }

  create(newUser, result) {
    sql.query("INSERT INTO users SET ?", this, (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      console.log("Created User: ", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
    });
  }
}

module.exports = User;
