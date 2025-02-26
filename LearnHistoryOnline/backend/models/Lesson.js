const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Course = require('./Course');

const LessonContent = sequelize.define('LessonContent', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    courseId: { type: DataTypes.INTEGER, allowNull: true, references: { model: "Course", key: "id" } },
    author: { type: DataTypes.STRING, allowNull: false },
    imgPath: { type: DataTypes.STRING, allowNull: true }
}, { timestamps: true, tableName: 'Lesson'});

module.exports = LessonContent;