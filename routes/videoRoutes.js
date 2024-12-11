const express = require("express");
const {
  authenticateToken,
  authorizeAdmin,
} = require("../middlewares/authMiddleware");
const {
  getVideos,
  getVideoById,
  createVideo,
  updateVideo,
  deleteVideo,
} = require("../controllers/videoController");

const router = express.Router();

router.get("/", getVideos);
router.get("/:id", getVideoById);
router.post("/", authenticateToken, authorizeAdmin, createVideo);
router.put("/:id", authenticateToken, authorizeAdmin, updateVideo);
router.delete("/:id", authenticateToken, authorizeAdmin, deleteVideo);

module.exports = router;
