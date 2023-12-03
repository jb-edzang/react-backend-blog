const knex = require("knex");
const db = knex(require("../knexfile").development);

const getAllUsers = async (req, res) => {
  try {
    const users = await db.select().from("users");
    if (!users || users.length === 0) {
      return res.status(204).json({ message: "No users found." });
    }
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.body.id;

  if (!userId) {
    return res.status(400).json({ message: "User ID required" });
  }

  try {
    const deletedRows = await db("users").where("id", userId).delete();
    if (deletedRows === 0) {
      return res.status(204).json({ message: `User ID ${userId} not found` });
    }

    res.json({ message: "User deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUser = async (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    return res.status(400).json({ message: "User ID required" });
  }

  try {
    const user = await db.select().from("users").where("id", userId).first();
    if (!user) {
      return res.status(204).json({ message: `User ID ${userId} not found` });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
  getUser,
};
