const express = require('express');
const {
    createQuestion,
    getQuestionsForQuiz,
    updateQuestion,
    deleteQuestion
} = require('../controllers/questionController');

const router = express.Router();

router.post('/', createQuestion);
router.get('/quiz/:quizId', getQuestionsForQuiz);
router.put('/:id', updateQuestion);
router.delete('/:id', deleteQuestion);

module.exports = router;