const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Adjust the path based on your structure

// POST /api/users/create
router.post('/', async (req, res) => {
    const { userId, name } = req.body;

    // Check if userId and name are provided
    if (!userId || !name) {
        return res.status(400).json({ error: 'userId and name are required' });
    }

    // Ensure userId has at least 7 characters
    if (userId.length < 7) {
        return res.status(400).json({ error: 'userId must be at least 7 characters long' });
    }

    // Case-insensitive search for existing userId
    const existingUser = await User.findOne({ userId: { $regex: new RegExp(`^${userId}$`, 'i') } });

    // If userId already exists
    if (existingUser) {
        return res.status(400).json({ error: 'UserId already exists' });
    }

    // Create new user
    const newUser = new User({ userId: userId.toLowerCase(), name });
    await newUser.save();

    return res.status(201).json({ message: 'User created successfully', userId });
});

module.exports = router;
