const conn = require("./../db/conn");

class RefreshToken {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static refreshToken(userRefreshToken) {
    const query = { user_id: userRefreshToken.userId };
    const update = {
      $set: {
        user_id: userRefreshToken.userId,
        refresh_token: userRefreshToken.refreshToken,
      },
    };
    const options = { upsert: true };

    const refreshToken = conn
      .db()
      .collection("refresh_tokens")
      .updateOne(query, update, options);

    return refreshToken;
  }

  static deleteRefreshToken(constraint) {
    const refreshToken = conn
      .db()
      .collection("refresh_tokens")
      .deleteOne(constraint);

    return refreshToken;
  }

  static findBy(constraint) {
    const user = conn
      .db()
      .collection("refresh_tokens")
      .find(constraint)
      .toArray();
    return user;
  }
}

module.exports = RefreshToken;
