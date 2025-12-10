const express = require('express');
const router = express.Router();
const { generateQuestions } = require('../controllers/quizController');

router.post('/generate-questions', generateQuestions);

module.exports = router;
