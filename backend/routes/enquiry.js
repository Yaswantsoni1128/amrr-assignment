const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Item = require('../models/Item');

// Email transporter setup
const createTransporter = () => {
    return nodemailer.createTransporter({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
};

// POST /api/enquiry/:id - Send enquiry email for specific item
router.post('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({
                success: false,
                message: 'Item not found'
            });
        }

        const { customerEmail, customerName, message } = req.body;

        // Email configuration check
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.EMAIL_TO) {
            return res.status(500).json({
                success: false,
                message: 'Email configuration not set up properly'
            });
        }

        const transporter = createTransporter();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_TO,
            subject: `New Enquiry for Item: ${item.name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
                        New Item Enquiry
                    </h2>
                    
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
                        <h3 style="color: #007bff; margin-top: 0;">Item Details</h3>
                        <p><strong>Item Name:</strong> ${item.name}</p>
                        <p><strong>Item Type:</strong> ${item.type}</p>
                        <p><strong>Description:</strong> ${item.description}</p>
                        <p><strong>Item ID:</strong> ${item._id}</p>
                    </div>

                    ${customerName || customerEmail ? `
                    <div style="background-color: #e9ecef; padding: 20px; border-radius: 5px; margin: 20px 0;">
                        <h3 style="color: #28a745; margin-top: 0;">Customer Information</h3>
                        ${customerName ? `<p><strong>Name:</strong> ${customerName}</p>` : ''}
                        ${customerEmail ? `<p><strong>Email:</strong> ${customerEmail}</p>` : ''}
                        ${message ? `<p><strong>Message:</strong><br>${message}</p>` : ''}
                    </div>
                    ` : ''}

                    <div style="background-color: #fff3cd; padding: 20px; border-radius: 5px; margin: 20px 0;">
                        <p><strong>Enquiry Date:</strong> ${new Date().toLocaleString()}</p>
                        <p style="margin-bottom: 0;">Someone has shown interest in this item. Please follow up as soon as possible!</p>
                    </div>

                    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6;">
                        <p style="color: #6c757d; font-size: 14px;">
                            This email was automatically generated from your AMRR Items website.
                        </p>
                    </div>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        
        res.json({
            success: true,
            message: 'Enquiry sent successfully! We will get back to you soon.'
        });
    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send enquiry email. Please try again later.',
            error: error.message
        });
    }
});

// GET /api/enquiry/test - Test email configuration
router.get('/test', async (req, res) => {
    try {
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.EMAIL_TO) {
            return res.status(500).json({
                success: false,
                message: 'Email configuration not set up properly'
            });
        }

        const transporter = createTransporter();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_TO,
            subject: 'Test Email - AMRR Items System',
            html: `
                <h2>Test Email</h2>
                <p>This is a test email to verify that the email system is working correctly.</p>
                <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
            `
        };

        await transporter.sendMail(mailOptions);
        
        res.json({
            success: true,
            message: 'Test email sent successfully!'
        });
    } catch (error) {
        console.error('Test email error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send test email',
            error: error.message
        });
    }
});

module.exports = router; 