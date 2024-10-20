const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); // Import jsonwebtoken
const User = require('../models/User');

// POST /api/users/login
router.post('/', async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }
    try {
        // Use a case-insensitive regex to find the user by userId
        const user = await User.findOne({ userId: { $regex: new RegExp(`^${userId}$`, 'i') } });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.json({ token }); // Respond with the generated token
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
