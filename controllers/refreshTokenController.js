const knex = require("knex");
const db = knex(require("../knexfile").development);
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user: username, pwd: password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  try {
    const existingUser = await db("users").where({ username }).first();
    if (existingUser) {
      return res.status(409).json({ message: "Username already exists." });
    }

    const hashedPwd = await bcrypt.hash(pwd, 10);

    const [newUserId] = await db("users").insert({
      username: user,
      password: hashedPwd,
    });

    console.log(`New user ID: ${newUserId}`);

    res.status(201).json({ success: `New user ${user} created!` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { handleNewUser };
