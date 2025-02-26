const Lesson = require('../models/Lesson');

exports.createLesson = async (req, res) => {
    try {
        const { title, content, author } = req.body;

        const lesson = await Lesson.create({ title, content, courseId: 1, author});

        res.status(201).json({ message: 'Lesson created successfully', lesson });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.getLesson = async (req, res) => {
    try {
        const lessonId = req.params.lessonId;
        const lesson = await Lesson.findOne({ where: {id: lessonId} });
        
        res.json(lesson);
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

exports.getLessonsForCourse = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const lessons = await Lesson.findAll({ where: { courseId } });

        res.json(lessons);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deleteLesson = async (req, res) => {
    try {
        const lessonId = req.params.id;

        const quiz = await Lesson.findByPk(lessonId);

        if (!quiz) { 
            return res.status(201).json({ message: 'Question not found' });
        }

        await quiz.destroy();

        res.json({ message: 'Lesson deleted successfully!' });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};