const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Question = sequelize.define('Question', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    quizId: { type: DataTypes.INTEGER, allowNull: false, references: { model: "Quiz", key: "id" } },
    type: { type: DataTypes.STRING, allowNull: false },
    prompt: { type: DataTypes.STRING, allowNull: false },
    answers: { type: DataTypes.JSON, allowNull: false },
    correctAnswer: {type: DataTypes.STRING, allowNull: false}
}, { timestamps: true, tableName: 'Question' });

module.exports = Question;