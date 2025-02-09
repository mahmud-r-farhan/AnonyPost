// models/Post.js
const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  author: { type: String, default: 'Anonymous' },
  content: { type: String, required: true },
  profilePicture: String,
  likes: { type: Number, default: 0 },
  likedBy: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

// Add this line to enable nested replies
CommentSchema.add({ replies: [CommentSchema] });

const PostSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: String, default: 'Anonymous' },
  image: String,
  profilePicture: String,
  likes: { type: Number, default: 0 },
  comments: [CommentSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', PostSchema);