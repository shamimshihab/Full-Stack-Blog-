const express = require("express");
const router = express.Router();
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");
const jwt = require("jsonwebtoken");
const Post = require("../models/Post");
const Review = require("../models/Review");
const { findById } = require("../models/User");
const secret = process.env.SECRET;

// Create Post
router.post("/", uploadMiddleware.single("file"), async (req, res) => {
  try {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);

    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
      if (err) throw err;
      const { title, summary, content } = req.body;
      const postDoc = await Post.create({
        title,
        summary,
        content,
        cover: newPath,
        author: info.id,
      });
      res.json(postDoc);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update Post
router.put("/", uploadMiddleware.single("file"), async (req, res) => {
  try {
    let newPath = null;
    if (req.file) {
      const { originalname, path } = req.file;
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      newPath = path + "." + ext;
      fs.renameSync(path, newPath);
    }

    const { token } = req.cookies;

    console.log(" req.cookies", req.cookies);
    jwt.verify(token, secret, {}, async (err, info) => {
      if (err) throw err;
      const { id, title, summary, content } = req.body;
      const postDoc = await Post.findById(id);

      console.log("id", id);
      console.log("postDoc22", postDoc.author);
      const isAuthor =
        JSON.stringify(postDoc.author) === JSON.stringify(info.id);
      if (!isAuthor) {
        return res.status(400).json("You are not the author");
      }
      await postDoc.update({
        title,
        summary,
        content,
        cover: newPath ? newPath : postDoc.cover,
      });

      res.json(postDoc);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete Post
router.delete("/:id", uploadMiddleware.single("file"), async (req, res) => {
  const { token } = req.cookies;
  try {
    jwt.verify(token, secret, {}, async (err, info) => {
      const { id } = req.params;
      if (err) throw err;
      const postDoc = await Post.findById(id);
      const isAuthor =
        postDoc && postDoc.author && postDoc.author.equals(info.id);
      if (!isAuthor) {
        return res.status(400).json("You are not the author");
      }

      await Post.findByIdAndDelete(id);
      res.json({ message: "Post deleted successfully" });
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the post" });
  }
});
router.post(
  "/addNew",

  async (req, res) => {
    try {
      const { token } = req.cookies;

      console.log(" req.cookies", req.cookies);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while deleting the post" });
    }
  }
);

// Get Posts
router.get("/", async (req, res) => {
  res.json(
    await Post.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20)
  );
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id)
    .populate({
      path: "author",
      select: ["username"],
    })
    .populate({
      path: "review",
      options: { sort: { createdAt: -1 } },
    });

  res.json(postDoc);
});

router.post(
  "/:id/review/addNew",
  uploadMiddleware.single("file"),
  async (req, res) => {
    try {
      const { token } = req.cookies;

      console.log(" req.cookies", req.cookies);

      const { id } = req.params;
      const comment = req.body.comment;

      console.log("token", token);

      jwt.verify(token, secret, {}, async (err, info) => {
        console.log("infoID", info);
        const findPost = await Post.findById(id).exec();
        const reviewDoc = await Review.create({
          comment,
          author: info.username,
          authorID: info.id,
        });

        findPost.review.push(reviewDoc);
        const pushReviewToPost = await findPost.save();

        res.json(reviewDoc);
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while deleting the post" });
    }
  }
);

router.delete("/:postId/review/:reviewId", async (req, res) => {
  try {
    const { postId, reviewId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    post.review.pull(reviewId);

    await post.save();

    await Review.findByIdAndDelete(reviewId);

    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the review" });
  }
});

module.exports = router;
