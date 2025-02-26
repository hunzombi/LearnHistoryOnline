const Quiz = require('../models/Quiz');
const Question = require('../models/Question');

exports.createQuiz = async (req, res) => {
    try {
        const { lessonId, questions } = req.body;
        const name = "Quiz";

        const quiz = await Quiz.create({ name, lessonId });
        const quizId = quiz.id;

        questions.forEach( async (question) => {
            let prompt = question.prompt;
            let answers = question.answers;
            let correctAnswer = question.correctAnswer;
            let type = question.type;
            let questions = await Question.create({quizId, prompt, answers, correctAnswer, type});
        });
        
        res.status(201).json({ message: 'Quiz created successfully', quiz });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err});
    }
};

exports.getQuizForLesson = async (req, res) => {
    try {
        const lessonId = req.params.lessonId;

        const quiz = await Quiz.findOne({ where: { lessonId } });

        if (!quiz) {
            return res.status(201).json({ message: 'Quiz not found!' });
        }

        res.json(quiz);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.deleteQuiz = async (req, res) => {
    try {
        const quizId = req.params.id;

        const quiz = await Quiz.findByPk(quizId);

        quiz.destroy();

        res.status(201).json({ message: 'Quiz deleted.' });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};