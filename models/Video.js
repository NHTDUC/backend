const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    url: { type: String, required: true },
    category: { type: String },
    uploadedAt: { type: Date, default: Date.now },
    ratings: [{ userId: String, rating: Number }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Video", VideoSchema);
