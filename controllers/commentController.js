const Comment = require('../models/Comment')
const Post = require('../models/Post')

exports.addComment = async (req, res) => {
  const { postId, commentBody } = req.body;
  const userId = req.user.id;  // Assuming you're passing user info via JWT

  try {
    const newComment = new Comment({
      postId,
      userId,
      commentBody,
    });

    await newComment.save();

    // Optionally, you can populate the post data
    const post = await Post.findById(postId);
    res.json({ post, comment: newComment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// getComment
exports.addComment = async (req, res) => {
  const { postId, commentBody } = req.body;
  const userId = req.user.id;  // Assuming you're passing user info via JWT

  try {
    const newComment = new Comment({
      postId,
      userId,
      commentBody,
    });

    await newComment.save();

    // Optionally, you can populate the post data
    const post = await Post.findById(postId);
    res.json({ post, comment: newComment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};