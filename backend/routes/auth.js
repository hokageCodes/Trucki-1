const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Super Admin Model
const SuperAdmin = require('../models/SuperAdmin');


// Super Admin Signup Route
router.post('/superadmin-signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the email already exists in the database
        const existingSuperAdmin = await SuperAdmin.findOne({ email });
        if (existingSuperAdmin) {
        return res.status(409).json({ message: 'Email already registered' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create a new super admin
        const superAdmin = new SuperAdmin({
        email,
        password: hashedPassword,
        });

        await superAdmin.save();

        res.status(201).json({ message: 'Super admin created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
});


// Super Admin Login Route
router.post('/superadmin-login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the email exists in the database
        const superAdmin = await SuperAdmin.findOne({ email });
        if (!superAdmin) {
            return res.status(404).json({ message: 'Super admin not found' });
        }

        // Check if the password matches
        const isPasswordCorrect = await bcrypt.compare(password, superAdmin.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Generate a JWT token
        const token = jwt.sign(
        { userId: superAdmin._id, role: 'superadmin' },
        'secret',
        { expiresIn: '1h' }
        );

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
});

// Forgot Password Route
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
      // Check if the email exists in the super admin collection
        let user = await SuperAdmin.findOne({ email });

        if (!user) {
            // Check if the email exists in the admin collection
            user = await Admin.findOne({ email });
        }
    
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Generate a password reset token
        const token = jwt.sign({ userId: user._id }, 'secret', {
            expiresIn: '1h',
        });
    
        // Generate the reset link
        const resetLink = `${token}`;
    
        // Send the password reset email
        sendPasswordResetEmail(user.email, resetLink);
    
        res.status(200).json({ message: 'Password reset email sent' });
        } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
        }
    });

  // Reset Password Route
router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
      // Verify the password reset token
        const decodedToken = jwt.verify(token, 'secret');
        const userId = decodedToken.userId;

        // Update the user's password
        let user = await SuperAdmin.findById(userId);

        if (!user) {
            user = await Admin.findById(userId);
        }

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
});

module.exports = router;
