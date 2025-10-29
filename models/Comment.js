const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema(
    {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    commentBody: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // This will add createdAt and updatedAt
  }
)

const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment;