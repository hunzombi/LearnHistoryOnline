const express = require('express');
const { createLesson, getLessonsForCourse, deleteLesson, getLesson } = require('../controllers/lessonController');

const router = express.Router();

router.post('/', createLesson);
router.get('/lessonsForCourse/:courseId', getLessonsForCourse);
router.get('/lesson/:lessonId', getLesson);
router.delete('/:id', deleteLesson);

module.exports = router;