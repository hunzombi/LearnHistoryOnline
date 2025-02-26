const Course = require('./Course');
const Lesson = require('./Lesson');
const Quiz = require('./Quiz');
const Question = require('./Question');

Course.hasMany(Lesson, { foreignKey: 'courseId', onDelete: 'CASCADE' });
Lesson.belongsTo(Course, { foreignKey: 'courseId' });

Lesson.hasOne(Quiz, { foreignKey: 'lessonId', onDelete: 'CASCADE' });
Quiz.belongsTo(Lesson, { foreignKey: 'lessonId' });

Course.hasOne(Quiz, { foreignKey: 'CourseId', onDelete: 'CASCADE' });
Quiz.belongsTo(Course, { foreignKey: 'CourseId' });

Quiz.hasMany(Question, { foreignKey: 'quizId', onDelete: 'CASCADE' });
Question.belongsTo(Quiz, { foreignKey: 'quizId' });

module.exports = { Course, Lesson, Quiz, Question };