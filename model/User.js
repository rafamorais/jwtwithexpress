const conn = require("./../db/conn");

class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  save() {
    const user = conn.db().collection("users").insertOne({
      name: this.name,
      email: this.email,
      password: this.password,
    });

    return user;
  }

  static findBy(constraint) {
    const user = conn.db().collection("users").find(constraint).toArray();
    return user;
  }
}

module.exports = User;
