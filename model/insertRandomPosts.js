const knex = require("knex");
const axios = require("axios");
const format = require("date-fns");

const db = knex({
  client: "pg",
  connection: {
    database: "blogreactDB",
    user: "jean",
    password: process.env.DATABASE_URI,
  },
});

const insertPostsFromAPI = async (numPosts) => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const posts = response.data.slice(0, numPosts).map((post) => {
      return {
        title: post.title,
        datetime: format(new Date(), "dd/MM/yyyy HH:mm:ss"),
        body: post.body,
      };
    });

    await db("posts").insert(posts);
    console.log(`${numPosts} posts insérés avec succès.`);
  } catch (error) {
    console.error("Erreur lors de l'insertion des posts :", error);
  } finally {
    db.destroy();
  }
};

insertPostsFromAPI(5);
