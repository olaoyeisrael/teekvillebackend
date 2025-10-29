const Post = require('../models/Post')

exports.getAllPosts = async(req, res)=>{
    try {
    const posts = await Post.find().populate('userId', 'firstName lastName ');
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