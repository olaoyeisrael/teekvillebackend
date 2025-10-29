const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
    {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    time: {
    type: String,
   // Automatically set the current time when the post is created
  },
  tags: {
    type: [String], // Array of strings for tags
    required: true,  // Make sure tags are required for each post
  }
  },
  {
    timestamps: true, // This will add createdAt and updatedAt
  }
)

const Post = mongoose.model('Post', postSchema)
module.exports = Post;