const func = require("./../helpers/Functions");
const User = require("./../model/User");
const RefreshToken = require("./../model/RefreshToken");

module.exports = class AuthenticateController {
  static async login(req, res) {
    const { email, password } = req.body;

    const user = await User.findBy({ email, password });
    if (!user.length == 0) {
      const userId = func.uuidToString(user[0]._id);
      const accessToken = func.generateAccessToken({ id: userId }, "30s");
      const refreshToken = await func.generateAccessRefreshToken({
        id: userId,
      });

      res.send({ accessToken: accessToken, refreshToken: refreshToken });
    } else {
      res.send({ errors: "Email or passwrod invalid!" });
    }
  }

  static async logout(req, res) {
    const { token } = req.body;
    const refreshToken = await RefreshToken.findBy({ refresh_token: token });

    if (refreshToken.length == 0) return res.sendStatus(404);

    const deleteRefreshToken = await RefreshToken.deleteRefreshToken({
      refresh_token: refreshToken[0]?.refresh_token,
    });

    res.sendStatus(200);
  }

  static async refreshToken(req, res) {
    const { token } = req.body;
    const refreshTokenResult = await RefreshToken.findBy({
      refresh_token: token,
    });

    if (refreshTokenResult.length == 0) return res.sendStatus(404);

    const { accessToken, refreshToken } = await func.refreshToken(
      refreshTokenResult[0].refresh_token
    );

    res.send({ accessToken, refreshToken });
  }
};
