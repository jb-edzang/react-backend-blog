const knex = require("knex");
const db = knex(require("../knexfile").development); // Assurez-vous d'utiliser la bonne configuration d'environnement

const getAllPosts = async (req, res) => {
  try {
    const posts = await db.select().from("posts");
    if (!posts || posts.length === 0) {
      return res.status(204).json({ message: "No posts found." });
    }
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createNewPost = async (req, res) => {
  const { title, body } = req.body;

  if (!title || !body) {
    return res.status(400).json({ message: "Title and body are required." });
  }

  try {
    const [newPostId] = await db("posts").insert({ title, body });
    const newPost = await db
      .select()
      .from("posts")
      .where("id", newPostId)
      .first();
    res.status(201).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { title, body } = req.body;

  if (!postId) {
    return res.status(400).json({ message: "ID parameter is required." });
  }

  try {
    const updatedRows = await db("posts")
      .where("id", postId)
      .update({ title, body });
    if (updatedRows === 0) {
      return res.status(404).json({ message: `No post matches ID ${postId}.` });
    }

    const updatedPost = await db
      .select()
      .from("posts")
      .where("id", postId)
      .first();
    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deletePost = async (req, res) => {
  const postId = req.params.id;

  if (!postId) {
    return res.status(400).json({ message: "Post ID required." });
  }

  try {
    const deletedRows = await db("posts").where("id", postId).delete();
    if (deletedRows === 0) {
      return res.status(404).json({ message: `No post matches ID ${postId}.` });
    }

    res.json({ message: "Post deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getPost = async (req, res) => {
  const postId = req.params.id;

  if (!postId) {
    return res.status(400).json({ message: "Post ID required." });
  }

  try {
    const post = await db.select().from("posts").where("id", postId).first();
    if (!post) {
      return res.status(404).json({ message: `No post matches ID ${postId}.` });
    }

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllPosts,
  createNewPost,
  updatePost,
  deletePost,
  getPost,
};
