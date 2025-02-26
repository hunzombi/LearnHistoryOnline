const Question = require('../models/Question');

exports.createQuestion = async (req, res) => {
    try {
        const { quizId, type, prompt, answers, choices } = req.body;

        if (!quizId || !type || !prompt || !answers){
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newQuestion = await Question.create({
            quizId,
            type,
            prompt,
            answers,
            choices
        });

        res.status(201).json({ message: "Question created successfully" });
    } catch (err) {
        console.error('Error fetching questions:', err.message || err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.getQuestionsForQuiz = async (req, res) => {
    try {
        const quizId = req.params.quizId;
        
        console.log(quizId);
        const questionsw = await Question.findAll({ where: { quizId: quizId } });
        console.log("what?");

        /*if (questionsw == 0) {
            return res.status(404).json({ message: 'No questions found for this quiz' });
        }*/


        res.json(questionsw);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

exports.updateQuestion = async(req, res) => {
    try {
        const questionId = req.params.id;
        const { type, prompt, answers, choices } = req.body;

        const question = await Question.findByPk(questionId);

        question.type = type || question.type;
        question.prompt = prompt || question.prompt;
        question.answers = answers || question.answers;
        question.choices = choices || question.choices;

        await question.save();

        res.json({ message: 'Question updated successfully', question });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

exports.deleteQuestion = async (req, res) => {
    try {
        const questionId = req.params.id;

        const question = await Question.findByPk(questionId);

        if (!question) { 
            return res.status(201).json({ message: 'Question not found' });
        }

        await question.destroy();

        res.json({ message: 'Question deleted successfully!' });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}