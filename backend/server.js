const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load environment variables
dotenv.config({ path: './.env' });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve static files from uploads directory
app.use('/uploads', express.static(uploadsDir));

// MongoDB connection
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/amrr-items');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

connectDB();

// Import routes
const itemRoutes = require('./routes/items');
const enquiryRoutes = require('./routes/enquiry');

// Routes
app.use('/api/items', itemRoutes);
app.use('/api/enquiry', enquiryRoutes);

// Health check route
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'AMRR Items API is running!',
        timestamp: new Date().toISOString()
    });
});

// Seed data route for development
app.post('/api/seed', async (req, res) => {
    try {
        const Item = require('./models/Item');
        
        // Clear existing items
        await Item.deleteMany({});

        // Create sample items with placeholder images
        const sampleItems = [
            {
                name: 'Blue Denim Shirt',
                type: 'Shirt',
                description: 'Comfortable blue denim shirt perfect for casual wear. Made from high-quality cotton with a modern fit.',
                coverImage: 'placeholder-shirt.jpg',
                additionalImages: ['placeholder-shirt-2.jpg', 'placeholder-shirt-3.jpg']
            },
            {
                name: 'Black Formal Pants',
                type: 'Pant',
                description: 'Professional black formal pants for office wear. Wrinkle-resistant fabric with a tailored fit.',
                coverImage: 'placeholder-pants.jpg',
                additionalImages: ['placeholder-pants-2.jpg']
            },
            {
                name: 'Running Shoes',
                type: 'Shoes',
                description: 'High-performance running shoes with excellent cushioning and support for long-distance running.',
                coverImage: 'placeholder-shoes.jpg',
                additionalImages: ['placeholder-shoes-2.jpg', 'placeholder-shoes-3.jpg']
            },
            {
                name: 'Tennis Racket',
                type: 'Sports Gear',
                description: 'Professional tennis racket for competitive play. Lightweight design with enhanced control and power.',
                coverImage: 'placeholder-racket.jpg',
                additionalImages: ['placeholder-racket-2.jpg']
            },
            {
                name: 'Cotton T-Shirt',
                type: 'Shirt',
                description: 'Soft cotton t-shirt available in multiple colors. Perfect for everyday wear.',
                coverImage: 'placeholder-tshirt.jpg',
                additionalImages: []
            }
        ];

        const insertedItems = await Item.insertMany(sampleItems);
        res.json({
            success: true,
            message: 'Sample data seeded successfully',
            count: insertedItems.length,
            data: insertedItems
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error seeding data',
            error: error.message
        });
    }
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Global error handling middleware
app.use((error, req, res, next) => {
    console.error('Global error:', error);
    
    if (error.name === 'ValidationError') {
        const errors = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({
            success: false,
            message: 'Validation Error',
            errors: errors
        });
    }

    if (error.name === 'CastError') {
        return res.status(400).json({
            success: false,
            message: 'Invalid ID format'
        });
    }

    if (error.code === 11000) {
        return res.status(400).json({
            success: false,
            message: 'Duplicate field value'
        });
    }

    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'production' ? {} : error.message
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API Health Check: http://localhost:${PORT}/api/health`);
}); 