const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Item name is required'],
        trim: true
    },
    type: {
        type: String,
        required: [true, 'Item type is required'],
        enum: ['Shirt', 'Pant', 'Shoes', 'Sports Gear', 'Other'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Item description is required'],
        trim: true
    },
    coverImage: {
        type: String,
        required: [true, 'Cover image is required']
    },
    additionalImages: [{
        type: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
itemSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item; 