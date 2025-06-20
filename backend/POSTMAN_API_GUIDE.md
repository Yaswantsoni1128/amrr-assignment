# AMRR Items API - Postman Testing Guide

Base URL: `http://localhost:5000/api`

## 📋 Complete API Endpoints Collection

### 1. Health Check
**GET** `http://localhost:5000/api/health`

**Headers:** None required
**Body:** None

**Expected Response:**
```json
{
    "success": true,
    "message": "AMRR Items API is running!",
    "timestamp": "2024-01-01T00:00:00.000Z"
}
```

---

### 2. Get All Items
**GET** `http://localhost:5000/api/items`

**Headers:** None required
**Body:** None

**Expected Response:**
```json
{
    "success": true,
    "count": 5,
    "data": [
        {
            "_id": "65a1b2c3d4e5f6789012345a",
            "name": "Blue Denim Shirt",
            "type": "Shirt",
            "description": "Comfortable blue denim shirt perfect for casual wear",
            "coverImage": "placeholder-shirt.jpg",
            "additionalImages": ["placeholder-shirt-2.jpg"],
            "createdAt": "2024-01-01T00:00:00.000Z",
            "updatedAt": "2024-01-01T00:00:00.000Z"
        }
    ]
}
```

---

### 3. Get Single Item by ID
**GET** `http://localhost:5000/api/items/{ITEM_ID}`

Replace `{ITEM_ID}` with actual item ID from step 2.

**Headers:** None required
**Body:** None

**Expected Response:**
```json
{
    "success": true,
    "data": {
        "_id": "65a1b2c3d4e5f6789012345a",
        "name": "Blue Denim Shirt",
        "type": "Shirt",
        "description": "Comfortable blue denim shirt perfect for casual wear",
        "coverImage": "placeholder-shirt.jpg",
        "additionalImages": ["placeholder-shirt-2.jpg"],
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
    }
}
```

---

### 4. Create New Item (With File Upload)
**POST** `http://localhost:5000/api/items`

**Headers:** 
- Content-Type: `multipart/form-data` (Postman sets this automatically)

**Body:** Select `form-data` in Postman
| Key | Type | Value |
|-----|------|-------|
| `name` | Text | `Red Cotton T-Shirt` |
| `type` | Text | `Shirt` |
| `description` | Text | `Comfortable red cotton t-shirt for everyday wear` |
| `coverImage` | File | Select an image file |
| `additionalImages` | File | Select additional image file 1 |
| `additionalImages` | File | Select additional image file 2 |

**Expected Response:**
```json
{
    "success": true,
    "message": "Item successfully added",
    "data": {
        "_id": "65a1b2c3d4e5f6789012345b",
        "name": "Red Cotton T-Shirt",
        "type": "Shirt",
        "description": "Comfortable red cotton t-shirt for everyday wear",
        "coverImage": "coverImage-1234567890-123456789.jpg",
        "additionalImages": ["additionalImages-1234567890-123456790.jpg"],
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
    }
}
```

---

### 5. Update Item (With File Upload)
**PUT** `http://localhost:5000/api/items/{ITEM_ID}`

**Headers:** 
- Content-Type: `multipart/form-data`

**Body:** Select `form-data` in Postman
| Key | Type | Value |
|-----|------|-------|
| `name` | Text | `Updated Red Cotton T-Shirt` |
| `type` | Text | `Shirt` |
| `description` | Text | `Updated description for the t-shirt` |
| `coverImage` | File | (Optional) Select new cover image |
| `additionalImages` | File | (Optional) Select new additional images |

**Expected Response:**
```json
{
    "success": true,
    "message": "Item updated successfully",
    "data": {
        "_id": "65a1b2c3d4e5f6789012345b",
        "name": "Updated Red Cotton T-Shirt",
        "type": "Shirt",
        "description": "Updated description for the t-shirt",
        "coverImage": "coverImage-1234567890-123456789.jpg",
        "additionalImages": ["additionalImages-1234567890-123456790.jpg"],
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:01.000Z"
    }
}
```

---

### 6. Delete Item
**DELETE** `http://localhost:5000/api/items/{ITEM_ID}`

**Headers:** None required
**Body:** None

**Expected Response:**
```json
{
    "success": true,
    "message": "Item deleted successfully"
}
```

---

### 7. Send Enquiry Email
**POST** `http://localhost:5000/api/enquiry/{ITEM_ID}`

**Headers:** 
- Content-Type: `application/json`

**Body:** Select `raw` → `JSON` in Postman
```json
{
    "customerName": "John Doe",
    "customerEmail": "john.doe@example.com",
    "message": "I am interested in this item. Could you please provide more details about pricing and availability?"
}
```

**Expected Response:**
```json
{
    "success": true,
    "message": "Enquiry sent successfully! We will get back to you soon."
}
```

---

### 8. Test Email Configuration
**GET** `http://localhost:5000/api/enquiry/test`

**Headers:** None required
**Body:** None

**Expected Response:**
```json
{
    "success": true,
    "message": "Test email sent successfully!"
}
```

---

### 9. Seed Database (Development Only)
**POST** `http://localhost:5000/api/seed`

**Headers:** None required
**Body:** None

**Expected Response:**
```json
{
    "success": true,
    "message": "Sample data seeded successfully",
    "count": 5,
    "data": [
        {
            "_id": "65a1b2c3d4e5f6789012345a",
            "name": "Blue Denim Shirt",
            "type": "Shirt",
            "description": "Comfortable blue denim shirt perfect for casual wear",
            "coverImage": "placeholder-shirt.jpg",
            "additionalImages": ["placeholder-shirt-2.jpg"]
        }
    ]
}
```

---

## 🧪 Testing Sequence

### Recommended Testing Order:

1. **Health Check** - Verify API is running
2. **Seed Database** - Add sample data
3. **Get All Items** - View seeded items
4. **Get Single Item** - Copy an item ID for further tests
5. **Create New Item** - Test file upload
6. **Update Item** - Test updating with new data
7. **Send Enquiry** - Test email functionality
8. **Delete Item** - Test deletion

---

## 📁 File Upload Testing

For testing file uploads in Postman:

1. Select **POST** method
2. Go to **Body** tab
3. Select **form-data**
4. For file fields:
   - Change dropdown from "Text" to "File"
   - Click "Select Files" to upload images
5. Supported formats: JPG, JPEG, PNG, GIF, WEBP
6. Max file size: 5MB per file

---

## ⚠️ Common Error Responses

### 400 Bad Request
```json
{
    "success": false,
    "message": "Name, type, and description are required"
}
```

### 404 Not Found
```json
{
    "success": false,
    "message": "Item not found"
}
```

### 500 Internal Server Error
```json
{
    "success": false,
    "message": "Internal Server Error",
    "error": "Detailed error message"
}
```

---

## 🔧 Environment Variables for Email Testing

To test email functionality, update your `.env` file:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/amrr-items
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_app_password
EMAIL_TO=recipient@example.com
```

**Note:** For Gmail, you need to:
1. Enable 2-factor authentication
2. Generate an app-specific password
3. Use the app password in EMAIL_PASS

---

## 📸 Image Access

Uploaded images can be accessed at:
`http://localhost:5000/uploads/{filename}`

Example: `http://localhost:5000/uploads/coverImage-1234567890-123456789.jpg`

---

## 💡 Tips for Postman Testing

1. **Save requests** in a collection for reuse
2. **Use environment variables** for base URL and item IDs
3. **Check response status codes** (200, 201, 400, 404, 500)
4. **Verify response structure** matches expected format
5. **Test edge cases** (missing fields, invalid IDs, large files) 