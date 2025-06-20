const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Item = require('../models/Item');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
        files: 6 // 1 cover image + 5 additional images
    }
});

// GET /api/items - Get all items
router.get('/', async (req, res) => {
    try {
        const items = await Item.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            count: items.length,
            data: items
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching items',
            error: error.message
        });
    }
});

// GET /api/items/:id - Get single item by ID
router.get('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({
                success: false,
                message: 'Item not found'
            });
        }
        res.json({
            success: true,
            data: item
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching item',
            error: error.message
        });
    }
});

// POST /api/items - Create new item
router.post('/', upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'additionalImages', maxCount: 5 }
]), async (req, res) => {
    try {
        const { name, type, description } = req.body;

        // Validation
        if (!name || !type || !description) {
            return res.status(400).json({
                success: false,
                message: 'Name, type, and description are required'
            });
        }

        if (!req.files || !req.files.coverImage) {
            return res.status(400).json({
                success: false,
                message: 'Cover image is required'
            });
        }

        const coverImage = req.files.coverImage[0].filename;
        const additionalImages = req.files.additionalImages ?
            req.files.additionalImages.map(file => file.filename) : [];

        const newItem = new Item({
            name,
            type,
            description,
            coverImage,
            additionalImages
        });

        const savedItem = await newItem.save();
        res.status(201).json({
            success: true,
            message: 'Item successfully added',
            data: savedItem
        });
    } catch (error) {
        // Clean up uploaded files if save fails
        if (req.files) {
            if (req.files.coverImage) {
                fs.unlink(path.join(uploadsDir, req.files.coverImage[0].filename), () => {});
            }
            if (req.files.additionalImages) {
                req.files.additionalImages.forEach(file => {
                    fs.unlink(path.join(uploadsDir, file.filename), () => {});
                });
            }
        }

        res.status(500).json({
            success: false,
            message: 'Error creating item',
            error: error.message
        });
    }
});

// PUT /api/items/:id - Update item
router.put('/:id', upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'additionalImages', maxCount: 5 }
]), async (req, res) => {
    try {
        const { name, type, description } = req.body;
        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: 'Item not found'
            });
        }

        // Update fields
        if (name) item.name = name;
        if (type) item.type = type;
        if (description) item.description = description;

        // Update cover image if provided
        if (req.files && req.files.coverImage) {
            // Delete old cover image
            const oldCoverImagePath = path.join(uploadsDir, item.coverImage);
            if (fs.existsSync(oldCoverImagePath)) {
                fs.unlinkSync(oldCoverImagePath);
            }
            item.coverImage = req.files.coverImage[0].filename;
        }

        // Update additional images if provided
        if (req.files && req.files.additionalImages) {
            // Delete old additional images
            item.additionalImages.forEach(imageName => {
                const imagePath = path.join(uploadsDir, imageName);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            });
            item.additionalImages = req.files.additionalImages.map(file => file.filename);
        }

        const updatedItem = await item.save();
        res.json({
            success: true,
            message: 'Item updated successfully',
            data: updatedItem
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating item',
            error: error.message
        });
    }
});

// DELETE /api/items/:id - Delete item
router.delete('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: 'Item not found'
            });
        }

        // Delete associated images
        const coverImagePath = path.join(uploadsDir, item.coverImage);
        if (fs.existsSync(coverImagePath)) {
            fs.unlinkSync(coverImagePath);
        }

        item.additionalImages.forEach(imageName => {
            const imagePath = path.join(uploadsDir, imageName);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        });

        await Item.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: 'Item deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting item',
            error: error.message
        });
    }
});

module.exports = router; 