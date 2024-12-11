const User = require("../models/User");
const Video = require("../models/Video");

// Lấy danh sách tất cả người dùng
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy thông tin chi tiết một người dùng
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Thêm video vào danh sách yêu thích
const addFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.favorites.push(req.body.videoId);
    await user.save();
    res.json({ message: "Video added to favorites" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Thêm video vào danh sách xem sau
const addWatchLater = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.watchLater.push(req.body.videoId);
    await user.save();
    res.json({ message: "Video added to watch later" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy danh sách yêu thích
const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("favorites");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy danh sách xem sau
const getWatchLater = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("watchLater");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user.watchLater);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  addFavorite,
  addWatchLater,
  getFavorites,
  getWatchLater,
};
