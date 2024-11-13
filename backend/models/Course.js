const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    details: { type: String, required: true },
    semester: { type: String, required: true },
    enrollStatus: { type: String, default: 'enrolled' }
});

module.exports = mongoose.model('Course', courseSchema);
