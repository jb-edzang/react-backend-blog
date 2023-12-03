// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "pg",
    connection: {
      database: "blogreactDB",
      user: "jean",
      password: process.env.DATABASE_URI,
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./migrations",
    },
  },
};
