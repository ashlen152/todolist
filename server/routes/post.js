const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

const Post = require("../models/Post");
const { route } = require("./auth");

// @route Get api/posts
// @desc Get posts
// @access Private
router.get("/", verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.userId }).populate("user", [
      "username",
    ]);
    res.json({ success: true, posts });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Internal server errors" });
  }
});

// @route Post api/posts
// @desc Create post
// @access Private
router.post("/", verifyToken, async (req, res) => {
  const { title, description, url, status, userId } = req.body;

  if (!title)
    return res
      .status(400)
      .json({ success: false, message: "Title is required" });
  try {
    const newPost = new Post({
      title,
      description,
      url: url.startsWith("https://") ? url : `https://${url}`,
      status: status || "TO LEARN",
      user: req.userId,
    });

    await newPost.save();

    res.json({ success: true, message: "Happy learning !", post: newPost });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Internal server errors" });
  }
});

// @route Put api/posts
// @desc Update posts
// @access Private
router.put("/:id", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  if (!title)
    return res
      .status(400)
      .json({ success: false, message: "Title is required" });
  try {
    console.log(url);
    var updatedPost = {
      title,
      description: description || "",
      url: (url && (url.startsWith("https://") ? url : `https://${url}`)) || "",
      status: status || "TO LEARN",
    };

    const postUpdateCondition = {
      _id: req.params.id,
      user: req.userId,
    };

    updatedPost = await Post.findOneAndUpdate(
      postUpdateCondition,
      updatedPost,
      { new: true }
    );

    // User not authorised to update post or post not found
    if (!updatedPost)
      return res.status(401).json({
        success: false,
        message: "post not found or user not authorized",
      });

    res.json({
      success: true,
      message: "Excellent Progress!",
      post: updatedPost,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Internal server errors" });
  }
});

// @route delete api/posts
// @desc Delete posts
// @access Private
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const postDeleteCondition = {
      _id: req.params.id,
      user: req.userId,
    };

    const deletedPost = await Post.findOneAndDelete(postDeleteCondition);

    if (!deletedPost)
      return res.status(401).json({
        success: false,
        message: "post not found or user not authorized",
      });

    res.json({ success: true,message:'Delete success', post: deletedPost });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Internal server errors" });
  }
});
module.exports = router;
