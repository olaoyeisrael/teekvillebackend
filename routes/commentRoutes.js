const express = require('express');
const router = express.Router();
const { addComment, getComment, getAllComment } = require('../controllers/commentController');
const protect = require('../middlewares/auth.middleware');
// const protect = require('../middlewares/auth.middleware');

router.post('/:postId', protect, addComment);
router.get('/:postId', protect, getComment );
router.get('/', getAllComment );


module.exports = router;