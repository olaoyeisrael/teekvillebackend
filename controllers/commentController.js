const Comment = require('../models/Comment')
const Post = require('../models/Post')


// get comment for a post
exports.getComment = async (req, res) => {
  try{
  const postId = req.params.postId
  const post = await Post.findById(postId).populate('comments');
  if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
  return res.status(200).json(post.comments);}
  catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// add comment
exports.addComment = async (req, res) => {
  try {
    const { userName, commentBody } = req.body;
    const postId = req.params.postId;

    if (!userName || !commentBody) {
      return res.status(400).json({ message: 'Please provide both userName and commentBody' });
    }

    // Create a new comment
    const newComment = new Comment({
      postId,
      userName,
      commentBody
    });

    // Save the comment to the database
    const savedComment = await newComment.save();

    // Find the post and add the new comment to the post's comments array
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.comments.push(savedComment._id);
    await post.save();

    return res.status(201).json(savedComment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};


// GET endpoint to fetch all comments
exports.getAllComment = async (req, res) => {
  try {
    const allComments = await Comment.find()
      
    if (!allComments.length) {
      return res.status(404).json({ message: 'No comments found' });
    }

    return res.status(200).json(allComments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};