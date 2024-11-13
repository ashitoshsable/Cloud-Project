const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// Get all courses
router.get('/courses', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (error) {
        res.status(500).send('Error retrieving courses');
    }
});

// Get a specific course by ID
router.get('/course/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        course ? res.json(course) : res.status(404).send('Course not found');
    } catch (error) {
        res.status(500).send('Error retrieving the course');
    }
});

// Add a new course
router.post('/course', async (req, res) => {
    try {
        const newCourse = new Course(req.body);
        await newCourse.save();
        res.status(201).json(newCourse);
    } catch (error) {
        res.status(400).send('Error adding course');
    }
});

// Update a course
router.put('/course/:id', async (req, res) => {
    try {
        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        updatedCourse ? res.json(updatedCourse) : res.status(404).send('Course not found');
    } catch (error) {
        res.status(400).send('Error updating course');
    }
});

// Delete a course
router.delete('/course/:id', async (req, res) => {
    try {
        const deletedCourse = await Course.findByIdAndDelete(req.params.id);
        deletedCourse ? res.json(deletedCourse) : res.status(404).send('Course not found');
    } catch (error) {
        res.status(500).send('Error deleting course');
    }
});

module.exports = router;
