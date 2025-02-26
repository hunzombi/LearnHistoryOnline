const express = require('express');
const { createCourse, getCourses, deleteCourse, getCourseById } = require('../controllers/courseController');

const router = express.Router();

router.post('/create', createCourse);
router.get('/courses', getCourses);
router.get("/:id", getCourseById);
router.delete('/:id', deleteCourse);

module.exports = router;