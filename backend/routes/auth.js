const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../models/User');
const { JWT_SECRET } = process.env;

// Super Admin Signup
router.post('/superadmin/signup', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            email,
            password: hashedPassword,
            role: 'superadmin',
        });

        // Save the user to the database
        await newUser.save();

        res.status(200).json({ message: 'Super admin created successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Admin Signup
router.post('/admin/signup', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
        email,
        password: hashedPassword,
        role: 'admin',
        });

        // Save the user to the database
        await newUser.save();

        res.status(200).json({ message: 'Admin created successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Client Signup
router.post('/client/signup', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
        email,
        password: hashedPassword,
        role: 'client',
        });

        // Save the user to the database
        await newUser.save();

        res.status(200).json({ message: 'Client created successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Super Admin Login
router.post('/superadmin/login', async (req, res) => {
    // Super Admin Login
router.post('/superadmin/login', async (req, res) => {
    try {
        const { email, password } = req.body;

      // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

      // Compare the provided password with the stored password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

      // Create and sign a JWT token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
            expiresIn: '1d',
        });
      // Redirect to the dashboard page
        res.redirect('/dashboard');
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});

// Admin Login
router.post('/admin/login', async (req, res) => {
    try {
        // Handle admin login logic
        // ...
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Client Login
router.post('/client/login', async (req, res) => {
    try {
        // Handle client login logic
        // ...
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Forgot Password
router.post('/forgot-password', async (req, res) => {
    try {
        // Handle forgot password logic
        // ...
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Reset Password
router.post('/reset-password/:resetToken', async (req, res) => {
    try {
        // Handle reset password logic
        // ...
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
