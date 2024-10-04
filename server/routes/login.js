const express = require('express');
const router = express.Router();
const User = require('../models/User');
// POST /api/users/login
router.post('/', async (req, res) => {
    const { userId } = req.body;
    if (!userId) {
        return res.status(400).json({ error: 'User ID and password are required' });
    }

    try {
        const user = await User.findOne({ userId: { $regex: new RegExp(`^${userId}$`, 'i') } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Optionally, generate a JWT token here for user session
        // const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('Login successful');
        res.status(200).json({ message: 'Login successful' /*, token */ });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
module.exports = router;