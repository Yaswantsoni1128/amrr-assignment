# AMRR Items Backend

A Node.js Express server with MongoDB for managing items with image uploads and email functionality.

## Features

- **Item Management**: Full CRUD operations for items
- **File Upload**: Support for cover images and multiple additional images
- **Email System**: Send enquiry emails when users show interest in items
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Input validation and error handling
- **Static Files**: Serve uploaded images

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
   - Copy `config.env.example` to `config.env`
   - Update the values according to your setup

3. Start MongoDB (if using local instance):
```bash
mongod
```

## Environment Variables

Create a `config.env` file with the following variables:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/amrr-items
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
EMAIL_TO=admin@example.com
```

### Email Setup (Gmail)
1. Enable 2-factor authentication on your Gmail account
2. Generate an app-specific password
3. Use the app password in the `EMAIL_PASS` field

## Usage

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Health Check
- `GET /api/health` - Check if the API is running

### Items
- `GET /api/items` - Get all items
- `GET /api/items/:id` - Get single item by ID
- `POST /api/items` - Create new item (with file upload)
- `PUT /api/items/:id` - Update item (with file upload)
- `DELETE /api/items/:id` - Delete item

### Enquiry
- `POST /api/enquiry/:id` - Send enquiry email for specific item
- `GET /api/enquiry/test` - Test email configuration

### Development
- `POST /api/seed` - Seed database with sample data

## File Upload

### Supported formats:
- Images: jpg, jpeg, png, gif, webp
- Max file size: 5MB per file
- Max files: 1 cover image + 5 additional images

### Upload fields:
- `coverImage`: Single required image
- `additionalImages`: Array of optional images (max 5)

## Sample API Usage

### Create Item
```javascript
const formData = new FormData();
formData.append('name', 'Blue Shirt');
formData.append('type', 'Shirt');
formData.append('description', 'A comfortable blue shirt');
formData.append('coverImage', coverImageFile);
formData.append('additionalImages', additionalImage1);
formData.append('additionalImages', additionalImage2);

fetch('/api/items', {
    method: 'POST',
    body: formData
});
```

### Send Enquiry
```javascript
fetch('/api/enquiry/ITEM_ID', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        customerName: 'John Doe',
        customerEmail: 'john@example.com',
        message: 'I am interested in this item'
    })
});
```

## Database Schema

### Item Model
```javascript
{
    name: String (required),
    type: String (required, enum: ['Shirt', 'Pant', 'Shoes', 'Sports Gear', 'Other']),
    description: String (required),
    coverImage: String (required),
    additionalImages: [String],
    createdAt: Date,
    updatedAt: Date
}
```

## Error Handling

The API returns consistent error responses:

```javascript
{
    success: false,
    message: "Error description",
    error: "Detailed error message" // Only in development
}
```

## File Structure

```
backend/
├── models/
│   └── Item.js          # Item mongoose model
├── routes/
│   ├── items.js         # Item-related routes
│   └── enquiry.js       # Email enquiry routes
├── uploads/             # Uploaded images directory
├── server.js            # Main server file
├── config.env           # Environment variables
├── package.json         # Dependencies and scripts
└── README.md           # This file
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check the connection string in `config.env`
- Verify network connectivity

### Email Issues
- Verify Gmail app password setup
- Check spam folder for test emails
- Ensure EMAIL_* variables are set correctly

### File Upload Issues
- Check file size (max 5MB)
- Verify file format (images only)
- Ensure uploads directory has write permissions

## Development

### Adding New Routes
1. Create route file in `routes/` directory
2. Import and use in `server.js`
3. Add appropriate error handling

### Database Operations
- Use Mongoose models for database operations
- Implement proper validation
- Handle errors appropriately

## License

MIT License 