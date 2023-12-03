const knex = require("knex")(knexfile.development);
const knexfile = require("../knexfile");
const axios = require("axios");
const knexfile = require("../knexfile");

const db = knex({
  client: "pg",
  connection: {
    database: "blogreactDB",
    user: "jean",
    password: process.env.DATABASE_URI,
  },
  useNullAsDefault: true,
});

const insertUsersFromAPI = async (numUsers) => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    const users = response.data.slice(0, numUsers).map((user) => {
      return {
        username: { firstname, lastname },
        role: user.role,
      };
    });

    await db("users").insert(users);
    console.log(`${numUsers} utilisateurs insérés avec succès.`);
  } catch (error) {
    console.error("Erreur lors de l'insertion des utilisateurs :", error);
  } finally {
    db.destroy();
  }
};

insertUsersFromAPI(10);
