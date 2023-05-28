const nodemailer = require('nodemailer');

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
    host: 'in-v3.mailjet.com',
    port: 587,
    secure: false,
    auth: {
        user: '7a6d4b4f05797002220bfdb4dfdb63e1',
        pass: '67ea146d2a1242d5d04803cac43354f9',
    },
});

async function sendPasswordResetEmail(userEmail, resetLink) {
    try {
        const info = await transporter.sendMail({
        from: 'developer@hosteet.com', // Set the sender's email address
        to: userEmail, // Set the recipient's email address
        subject: 'Password Reset',
        html: `<p>Click the link below to reset your password:</p>
                <a href="${resetLink}">Reset Password</a>`,
        });

        console.log('Password reset email sent successfully:', info.messageId);
    } catch (error) {
        console.error('Error sending password reset email:', error);
    }
}

module.exports = sendPasswordResetEmail;
