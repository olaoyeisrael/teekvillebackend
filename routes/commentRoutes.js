const express = require('express');
const router = express.Router();
const { addComment } = require('../controllers/commentController');
const protect = require('../middlewares/auth.middleware');
// const protect = require('../middlewares/auth.middleware');

router.post('/comment', protect, addComment);
// router.get('/comment', protect, getComment );


module.exports = router;