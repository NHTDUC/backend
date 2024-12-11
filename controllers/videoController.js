const Video = require("../models/Video");

// Lấy danh sách video (hỗ trợ phân trang)
const getVideos = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const videos = await Video.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const total = await Video.countDocuments();
    res.json({ videos, total });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy chi tiết video
const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });
    res.json(video);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Tạo video mới
const createVideo = async (req, res) => {
  try {
    const video = new Video(req.body);
    await video.save();
    res.status(201).json(video);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Cập nhật video
const updateVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!video) return res.status(404).json({ message: "Video not found" });
    res.json(video);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Xóa video
const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });
    res.json({ message: "Video deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getVideos,
  getVideoById,
  createVideo,
  updateVideo,
  deleteVideo,
};
