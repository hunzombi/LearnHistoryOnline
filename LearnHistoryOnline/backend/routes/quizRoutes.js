const express = require('express');
const { createQuiz, getQuizForLesson, deleteQuiz } = require('../controllers/quizController');

const router = express.Router();

router.post('/', createQuiz);
router.get('/quiz/:lessonId', getQuizForLesson);
router.delete('/:id', deleteQuiz);

module.exports = router;