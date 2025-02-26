const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Quiz = sequelize.define('Quiz', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    courseId: { type: DataTypes.INTEGER, allowNull: true, references: { model: "Course", key: "id" } },
    lessonId: { type: DataTypes.INTEGER, allowNull: true, references: { model: "Lesson", key: "id" } }
}, { timestamps: true, tableName: "Quiz" });

module.exports = Quiz;