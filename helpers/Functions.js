require("dotenv").config();

const jwt = require("jsonwebtoken");
const RefreshToken = require("./../model/RefreshToken");

const generateAccessToken = function (user, expiresIn = "30m") {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn });
};

const generateAccessRefreshToken = async function (user) {
  const id = user.id;
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1h",
  });

  await RefreshToken.refreshToken({
    userId: id,
    refreshToken,
  });

  return refreshToken;
};

const refreshToken = async function (token) {
  return jwt.verify(
    token,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, user) => {
      if (err) return res.sendStatus(403);
      const accessToken = generateAccessToken({ id: user.id }, "30s");
      const refreshToken = await generateAccessRefreshToken({ id: user.id });

      return { accessToken, refreshToken };
    }
  );
};

const uuidToString = function (uuid) {
  const id = uuid
    .toString("hex")
    .replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, "$1-$2-$3-$4-$5");

  return id;
};

exports.generateAccessToken = generateAccessToken;
exports.generateAccessRefreshToken = generateAccessRefreshToken;
exports.refreshToken = refreshToken;
exports.uuidToString = uuidToString;
