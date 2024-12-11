const express = require("express");
const {
  authenticateToken,
  authorizeAdmin,
} = require("../middlewares/authMiddleware");
const { adminLogin, getAdminStats } = require("../controllers/adminController");

const router = express.Router();

// Admin login
router.post("/login", adminLogin);

// Get admin statistics
router.get("/stats", authenticateToken, authorizeAdmin, getAdminStats);

module.exports = router;
