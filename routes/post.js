const express = require("express");
const router = express.Router();
const postController = require("../post/registerController");

router.post("/", postController.handlePost);

module.exports = router;
