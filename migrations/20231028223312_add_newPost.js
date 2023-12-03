export const up = async (knex) => {
  await knex.schema.createTable("posts", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.string("body").notNullable();
    table.integer("userId").unsigned();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .foreign("userId")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
  });
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("username").notNullable();
    table.string("password").notNullable();
    table.string("role");
    table.timestamps(true, true);
  });
};

export const down = async (knex) => {
  await knex.schema.dropTable("users");
  await knex.schema.dropTable("posts");
};
