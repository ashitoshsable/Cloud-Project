const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');

// Get all courses
router.get('/courses', async (req, res) => {
    try {
        const courses = await Course.find().populate('creator', 'name'); // Populate creator's name
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
router.post('/course', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id; 
        const newCourse = new Course({ ...req.body, creator: userId }); 

        await newCourse.save();

        // Add course to user's createdCourses list
        const user = await User.findById(userId);
        user.createdCourses.push(newCourse._id);
        await user.save();

        res.status(201).json(newCourse);
    } catch (error) {
        res.status(400).send('Error creating course');
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

// Enroll a user in a course
router.post('/enroll/:id', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const courseId = req.params.id;

        // Find the course and the user
        const course = await Course.findById(courseId);
        const user = await User.findById(userId);

        if (!course) {
            return res.status(404).send('Course not found');
        }

        // Check if the user is already enrolled
        if (course.enrolledUsers.includes(userId)) {
            return res.status(400).send('User is already enrolled in this course');
        }

        // Add user to the course's enrolledUsers list
        course.enrolledUsers.push(userId);
        await course.save();

        // Add course to the user's enrolledCourses list
        user.enrolledCourses.push(courseId);
        await user.save();

        res.status(200).send('Enrollment successful');
    } catch (error) {
        res.status(500).send('Error enrolling in the course');
    }
});

// Get courses created by the logged-in user
router.get('/my-courses', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        console.log("Logged-in User ID:", userId);
        const courses = await Course.find({ creator: userId });
        console.log("Fetched Courses:", courses);
        res.json(courses);
    } catch (error) {
        res.status(500).send('Error retrieving user-created courses');
    }
});


// Endpoint to get enrolled courses for a specific user
router.get('/enrolled-courses', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).populate('enrolledCourses');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user.enrolledCourses);
    } catch (error) {
        console.error('Error fetching enrolled courses:', error);
        res.status(500).json({ message: 'Error retrieving enrolled courses' });
    }
});

router.delete('/unenroll/:courseId', authMiddleware, async (req, res) => {
    const { courseId } = req.params;
    const userId = req.user.id; // Assuming the user's ID is available in req.user.id from the auth middleware

    try {
        // Find the user and the course
        const user = await User.findById(userId);
        const course = await Course.findById(courseId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Check if the user is enrolled in the course
        if (!user.enrolledCourses.includes(courseId)) {
            return res.status(400).json({ message: 'User is not enrolled in this course' });
        }

        // Remove the course from the user's enrolled courses
        user.enrolledCourses = user.enrolledCourses.filter(course => course.toString() !== courseId);
        await user.save();

        // Remove the user from the course's enrolled users
        course.enrolledUsers = course.enrolledUsers.filter(user => user.toString() !== userId);
        await course.save();

        res.status(200).json({ message: 'Successfully unenrolled from the course' });

    } catch (error) {
        console.error('Error unenrolling from the course:', error);
        res.status(500).json({ message: 'Error unenrolling from the course' });
    }
});


// Get users enrolled in a specific course
router.get('/course/:id/enrolled-users', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate('enrolledUsers', 'name email');
        
        if (!course) {
            return res.status(404).send('Course not found');
        }
        
        res.json(course.enrolledUsers);
    } catch (error) {
        res.status(500).send('Error retrieving enrolled users');
    }
});



module.exports = router;
