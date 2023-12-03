const knex = require("knex");
const db = knex(require("../knexfile").development);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { user: username, pwd: password } = req.body;
  //console.log("Username received", username);

  if (!username || !password)
    return res
      .status(400)
      .json({ message: "username and password are required." });

  // verify if user exists in db
  try {
    const foundUser = await db("users").where({ username }).first();
    if (!foundUser) return res.sendStatus(401);

    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
      const roles = foundUser.roles.filter(Boolean);

      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: foundUser.username,
            roles: foundUser.roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10s" }
      );
      const refreshToken = jwt.sign(
        { username: foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      await db("users").where("id", foundUser.id).update({ refreshToken });

      // create secure cookie with
      res.cookie("jwt", refreshToken, {
        httpOnly: true, // acessible only by web server
        secure: true, // https
        sameSite: "None", // cross-site cookie
        maxAge: 7 * 24 * 60 * 60 * 1000, // cookie expiry: set to match rT
      });
      // Send accessToken containing username and roles
      res.json({ roles, accessToken });
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { handleLogin };
