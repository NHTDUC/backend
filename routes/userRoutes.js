const express = require("express");
const { authenticateToken } = require("../middlewares/authMiddleware");
const {
  getUsers,
  getUserById,
  addFavorite,
  addWatchLater,
  getFavorites,
  getWatchLater,
} = require("../controllers/userController");

const router = express.Router();

router.get("/", authenticateToken, getUsers);
router.get("/:id", authenticateToken, getUserById);
router.post("/:id/favorites", authenticateToken, addFavorite);
router.post("/:id/watchlater", authenticateToken, addWatchLater);
router.get("/:id/favorites", authenticateToken, getFavorites);
router.get("/:id/watchlater", authenticateToken, getWatchLater);

module.exports = router;
