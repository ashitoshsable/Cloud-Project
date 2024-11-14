const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    details: { type: String, required: true },
    semester: { type: String, required: true },
    enrollStatus: { type: String, default: 'open' },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    enrolledUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // New field for enrolled users
});

module.exports = mongoose.model('Course', courseSchema);
