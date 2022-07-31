const express = require("express");
const postController = require("../controller/PostController");
const router = express.Router();
const authenticateToken = require("./../middleware/AuthenticateToken");

router.get("/", authenticateToken.auth, postController.post);

module.exports = router;
