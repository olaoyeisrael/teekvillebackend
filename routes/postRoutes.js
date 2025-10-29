const express = require('express');
const router = express.Router();
const { createPost, getAllPosts } = require('../controllers/postController')
const protect = require('../middlewares/auth.middleware');
// const protect = require('../middlewares/auth.middleware');

router.post('/post', protect, createPost);
router.get('/post', protect, getAllPosts);


module.exports = router;