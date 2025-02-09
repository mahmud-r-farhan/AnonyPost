// routes/posts.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const Post = require('../models/Post');

// Helper function to find comment by ID recursively
const findCommentById = (comments, id) => {
  for (let comment of comments) {
    if (comment._id.toString() === id) {
      return comment;
    }
    if (comment.replies && comment.replies.length > 0) {
      const found = findCommentById(comment.replies, id);
      if (found) return found;
    }
  }
  return null;
};

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new post
router.post('/', upload.single('image'), async (req, res, next) => {
  try {
    if (!req.body.content) {
      return res.status(400).json({ message: 'Content is required' });
    }

    let imageUrl = null;
    
    if (req.file) {
      try {
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const dataURI = `data:${req.file.mimetype};base64,${b64}`;
        
        const result = await cloudinary.uploader.upload(dataURI, {
          resource_type: 'auto',
          folder: 'anonymous-posts',
        });
        
        imageUrl = result.secure_url;
        console.log('Image uploaded successfully:', imageUrl);
      } catch (cloudinaryError) {
        console.error('Cloudinary upload error:', cloudinaryError);
        return res.status(500).json({ 
          message: 'Image upload failed',
          error: cloudinaryError.message 
        });
      }
    }

    const post = new Post({
      content: req.body.content.trim(),
      author: (req.body.author || 'Anonymous').trim(),
      image: imageUrl,
      profilePicture: req.body.profilePicture
    });

    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Post creation error:', error);
    next(error);
  }
});

// Get a specific post
router.get('/:id', getPost, (req, res) => {
  res.json(res.post);
});

// Like a post
router.post('/:id/like', getPost, async (req, res) => {
  res.post.likes += 1;
  try {
    const updatedPost = await res.post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Comment on a post
router.post('/:id/comment', getPost, async (req, res) => {
  res.post.comments.push({
    author: req.body.author || 'Anonymous',
    content: req.body.content
  });
  try {
    const updatedPost = await res.post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add a comment or reply
router.post('/:id/comments', getPost, async (req, res, next) => {
  try {
    if (!req.body.content) {
      return res.status(400).json({ message: 'Comment content is required' });
    }

    const { content, author, profilePicture, parentId } = req.body;
    const newComment = {
      content: content.trim(),
      author: (author || 'Anonymous').trim(),
      profilePicture,
      likes: 0,
      likedBy: [],
      createdAt: new Date(),
      replies: []
    };

    if (parentId) {
      const parentComment = findCommentById(res.post.comments, parentId);
      if (!parentComment) {
        return res.status(404).json({ message: 'Parent comment not found' });
      }
      
      if (!parentComment.replies) {
        parentComment.replies = [];
      }
      parentComment.replies.push(newComment);
    } else {
      res.post.comments.push(newComment);
    }

    const updatedPost = await res.post.save();
    
    const addedComment = parentId 
      ? findCommentById(updatedPost.comments, parentId).replies.slice(-1)[0]
      : updatedPost.comments.slice(-1)[0];

    res.status(201).json(addedComment);
  } catch (error) {
    console.error('Error adding comment:', error);
    next(error);
  }
});

// Like a comment
router.post('/:postId/comments/:commentId/like', getPost, async (req, res) => {
  try {
    const { username } = req.body;
    
    // Function to find and update comment likes recursively
    const findAndUpdateCommentLikes = (comments, commentId, username) => {
      for (let comment of comments) {
        if (comment._id.toString() === commentId) {
          if (!comment.likedBy) comment.likedBy = [];
          
          const userLikeIndex = comment.likedBy.indexOf(username);
          let liked = false;

          if (userLikeIndex === -1) {
            comment.likedBy.push(username);
            comment.likes = (comment.likes || 0) + 1;
            liked = true;
          } else {
            comment.likedBy.splice(userLikeIndex, 1);
            comment.likes = Math.max(0, (comment.likes || 1) - 1);
            liked = false;
          }

          return {
            success: true,
            likes: comment.likes,
            liked,
            likedBy: comment.likedBy
          };
        }
        
        if (comment.replies && comment.replies.length > 0) {
          const result = findAndUpdateCommentLikes(comment.replies, commentId, username);
          if (result.success) return result;
        }
      }
      return { success: false };
    };

    const result = findAndUpdateCommentLikes(res.post.comments, req.params.commentId, username);
    
    if (!result.success) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    await res.post.save();
    res.json({
      likes: result.likes,
      liked: result.liked,
      likedBy: result.likedBy
    });
  } catch (error) {
    console.error('Error liking comment:', error);
    res.status(400).json({ message: error.message });
  }
});

// Get comments for a post
router.get('/:id/comments', getPost, async (req, res) => {
  try {
    const comments = res.post.comments;
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getPost(req, res, next) {
  try {
    const post = await Post.findById(req.params.id);
    if (post == null) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.post = post;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = router;