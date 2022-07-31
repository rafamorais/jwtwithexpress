const User = require("./../model/User");

module.exports = class UserController {
  static store(req, res) {
    const { name, email, password } = req.body;

    const findUser = User.findBy({ email });
    if (findUser.length != 0) {
      return res.send({ error: "This email is already in use!" });
    }

    const user = new User(name, email, password);
    user.save();
    res.send({ sucess: "User created successfuly", user });
  }
};
