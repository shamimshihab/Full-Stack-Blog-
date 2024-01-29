const express = require("express");
const router = express.Router();
const AboutMe = require("../models/AboutMe");

// Get AboutMe
router.get("/", async (req, res) => {
  try {
    const aboutMe = await AboutMe.findOne();
    if (aboutMe) {
      res.json({ description: aboutMe.description });
    } else {
      res.status(404).json({ error: "AboutMe information not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
