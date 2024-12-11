const User = require("../models/User");
const Video = require("../models/Video");
const jwt = require("jsonwebtoken");

// Đăng nhập admin
const adminLogin = async (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "admin123") {
    const token = jwt.sign({ role: "admin" }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    return res.json({ token });
  }
  res.status(401).json({ message: "Invalid credentials" });
};

// Thống kê admin
const getAdminStats = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const videoCount = await Video.countDocuments();
    res.json({ userCount, videoCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { adminLogin, getAdminStats };
