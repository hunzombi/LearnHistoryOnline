const fs = require('fs');
const path = require('path');

const Course = require('../models/Course');
const { uploadFile } = require('../utils/uploadFile');

exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.findAll();
        res.json(courses);
    } catch (err){
        res.status(500).json({ error: err.message });
    }
};

exports.getCourseById = async (req, res) => {
    const id = req.params.id;
    try {
        const course = await Course.findByPk(id);

        res.json(course);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.createCourse = async (req, res) => {
    try {
        const { title, description } = req.body;
        const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

        if (req.files?.image) {
            await uploadFile(req.files.image);
        }

        const course = await Course.create({ title, description, imagePath });

        res.status(201).json({ message: 'Course created successfully' }, course);
    } catch (err) {
        res.status(500).json({ error: 'internal server error' });
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        const courseId = req.params.id;

        const course = await Course.findByPk(courseId);

        if (!course) {
            return res.status(404).json({ message: 'Course not found!' });
        }

        if (course.imagePath) {
            const imagePath = path.join(__dirname, '..', course.imagePath);

            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await course.destroy();

        res.status(201).json({ message: 'Course and its image deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'internal server error' });
    }
};