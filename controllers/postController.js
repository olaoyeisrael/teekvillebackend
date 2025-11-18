const Post = require('../models/Post')
const mongoose = require('mongoose')

exports.getAllPosts = async(req, res)=>{
    try {
    const posts = await Post.find().populate('userId', 'firstName lastName ').populate('comments');
    res.json({success: true, posts});
  } catch (err) {
    console.error(err);
    res.status(500).json({success: false, message: 'Server error' });
  }

}






exports.createPost = async (req, res) => {
  const { title, body, tags } = req.body;
  const userId = req.user.id;  // Assuming you're passing user info via JWT
  if (!body || !tags) {
    return res.status(400).json({success: false, message: 'Body and tags are required' });
  }
   const now = new Date();

  const formattedTime = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });


  try {
    const newPost = new Post({
      userId,
      title,
      body,
      tags,  
      time: formattedTime
    });
    

    await newPost.save();
    res.status(201).json({success: true, newPost});
  } catch (err) {
    console.error(err);
    res.status(500).json({ success:false, message: 'Server error' });
  }
};


exports.getPost = async (req, res) => {
  try {
    // Get the postId from the route parameters
    const postId = req.params.postId;

    // Validate the postId format (ObjectId check)
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: 'Invalid post ID format' });
    }

    // Fetch the post by its ID
    const post = await Post.findById(postId).populate('comments').populate('userId', 'firstName lastName ');

    // If no post is found, return a 404
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Return the post if found
    return res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
