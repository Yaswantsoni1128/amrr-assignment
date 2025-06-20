# AMRR Items - Item Management System

A full-stack web application for managing items with image uploads, detailed viewing, and enquiry functionality. Built with modern technologies and featuring a beautiful, responsive UI.

![AMRR Items](https://img.shields.io/badge/AMRR-Items-blue?style=for-the-badge&logo=react)
![Version](https://img.shields.io/badge/version-1.0.0-green?style=for-the-badge)

## Live URL:
### Frontend: https://amrr-assignment-eight.vercel.app/
### Backend: https://amrr-assignment-1.onrender.com

## 🌟 Features

### Core Functionality
- **📋 View Items**: Browse all items in a responsive grid layout
- **➕ Add Items**: Upload new items with detailed information and multiple images
- **🔍 Item Details**: View comprehensive item information in an interactive modal
- **📧 Enquiry System**: Send enquiries about specific items via email
- **🖼️ Image Management**: Support for cover images and up to 5 additional images per item
- **🔄 Real-time Updates**: See newly added items immediately without page refresh

### Advanced Features
- **🎨 Modern UI/UX**: Beautiful, responsive design with animations and transitions
- **📱 Mobile Responsive**: Optimized for all screen sizes and devices
- **🖱️ Interactive Elements**: Hover effects, smooth transitions, and micro-interactions
- **🎢 Image Carousel**: Navigate through multiple item images with thumbnails
- **🔍 Search & Filter**: Find items by name, description, or category
- **⚡ Fast Performance**: Optimized loading and smooth user experience
- **📊 Progress Tracking**: Visual feedback for form completion and uploads

## 🛠️ Tech Stack

### Frontend
- **⚛️ React 19** - Modern UI library
- **⚡ Vite** - Lightning-fast build tool
- **🎨 Tailwind CSS** - Utility-first CSS framework
- **🛣️ React Router** - Client-side routing
- **📡 Axios** - HTTP client for API calls
- **🎭 Custom Animations** - Smooth transitions and effects

### Backend
- **🟢 Node.js** - JavaScript runtime
- **🚂 Express.js** - Web application framework
- **🍃 MongoDB** - NoSQL database
- **🔗 Mongoose** - MongoDB object modeling
- **📤 Multer** - File upload handling
- **📧 Nodemailer** - Email functionality
- **🌐 CORS** - Cross-origin resource sharing

## 📂 Project Structure

```
AMRR-assignment/
├── 📁 backend/                 # Express.js backend
│   ├── 📁 models/             # Database models
│   │   └── Item.js            # Item schema
│   ├── 📁 routes/             # API routes
│   │   ├── items.js           # Item CRUD operations
│   │   └── enquiry.js         # Email enquiry routes
│   ├── 📁 uploads/            # Uploaded images storage
│   ├── server.js              # Main server file
│   ├── config.env             # Environment variables
│   ├── package.json           # Backend dependencies
│   └── README.md              # Backend documentation
├── 📁 frontend/               # React frontend
│   ├── 📁 src/
│   │   ├── 📁 components/     # Reusable components
│   │   │   ├── Layout.jsx     # Main layout
│   │   │   ├── Toast.jsx      # Notifications
│   │   │   └── ItemModal.jsx  # Item details modal
│   │   ├── 📁 pages/          # Page components
│   │   │   ├── ViewItems.jsx  # Items listing
│   │   │   └── AddItem.jsx    # Add new item
│   │   ├── 📁 services/       # API services
│   │   │   └── api.js         # Backend integration
│   │   ├── App.jsx            # Main app component
│   │   ├── main.jsx           # App entry point
│   │   └── index.css          # Global styles
│   ├── 📁 public/             # Static assets
│   ├── package.json           # Frontend dependencies
│   └── README.md              # Frontend documentation
├── README.md                  # This file
└── .gitignore                 # Git ignore rules
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/atlas)
- **Git** - [Download](https://git-scm.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/amrr-assignment.git
   cd amrr-assignment
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure Environment Variables**
   
   Create `backend/config.env` file:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/amrr-items
   EMAIL_USER=your_gmail@gmail.com
   EMAIL_PASS=your_gmail_app_password
   EMAIL_TO=admin@example.com
   ```

5. **Start the Application**
   
   **Terminal 1 - Backend:**
   ```bash
   cd backend
   npm run dev
   ```
   
   **Terminal 2 - Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

6. **Access the Application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`

## 📖 Usage Guide

### Adding New Items

1. **Navigate to "Add Items"** from the main navigation
2. **Fill in the form:**
   - Item Name (required)
   - Item Type: Shirt, Pant, Shoes, Sports Gear, or Other (required)
   - Description (required)
   - Cover Image (required) - drag & drop or click to upload
   - Additional Images (optional) - up to 5 images
3. **Submit the form** - you'll see a success message
4. **Automatic redirect** to View Items page to see your new item

### Viewing Items

1. **Browse the grid** of items on the main page
2. **Use search** to find specific items by name or description
3. **Filter by type** using the dropdown menu
4. **Click any item** to view detailed information
5. **Navigate images** using the carousel in the modal

### Sending Enquiries

1. **Click on any item** to open the details modal
2. **Click "Enquire About This Item"** button
3. **Fill in your details:**
   - Your Name (required)
   - Email Address (required)
   - Message (optional)
4. **Submit the enquiry** - an email will be sent to the admin

## 🔧 Configuration

### Database Setup

**Option 1: Local MongoDB**
```bash
# Install MongoDB Community Server
# Start MongoDB service
mongod
```

**Option 2: MongoDB Atlas (Cloud)**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get connection string
4. Update `MONGODB_URI` in `config.env`

### Email Configuration (Gmail)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password:**
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. **Update config.env:**
   ```env
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=generated_app_password
   EMAIL_TO=recipient@example.com
   ```

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Items
- **GET** `/items` - Get all items
- **GET** `/items/:id` - Get single item
- **POST** `/items` - Create new item (multipart/form-data)
- **PUT** `/items/:id` - Update item
- **DELETE** `/items/:id` - Delete item

#### Enquiry
- **POST** `/enquiry/:id` - Send enquiry email

#### Development
- **GET** `/health` - Health check
- **POST** `/seed` - Seed sample data

### Example Requests

**Create New Item:**
```javascript
const formData = new FormData();
formData.append('name', 'Blue Shirt');
formData.append('type', 'Shirt');
formData.append('description', 'A comfortable blue shirt');
formData.append('coverImage', coverImageFile);
formData.append('additionalImages', additionalImageFile);

fetch('/api/items', {
  method: 'POST',
  body: formData
});
```

**Send Enquiry:**
```javascript
fetch('/api/enquiry/ITEM_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    message: 'Interested in this item'
  })
});
```

## 🎨 Features Showcase

### Interactive UI Elements
- **🎯 Gradient Backgrounds** - Modern visual appeal
- **🌊 Smooth Animations** - Fade-in, slide-up, and scaling effects
- **🖱️ Hover Effects** - Interactive feedback on all clickable elements
- **📱 Responsive Design** - Perfect on desktop, tablet, and mobile
- **🔍 Search & Filter** - Real-time item filtering
- **📊 Progress Indicators** - Visual feedback for form completion

### Image Management
- **🖼️ Drag & Drop Upload** - Intuitive file handling
- **🎢 Image Carousel** - Smooth navigation through multiple images
- **🖱️ Thumbnail Navigation** - Quick image switching
- **⚡ Lazy Loading** - Optimized performance
- **🔄 Fallback Images** - Graceful handling of missing images

### User Experience
- **🔔 Toast Notifications** - Success, error, and warning messages
- **⏳ Loading States** - Clear feedback during operations
- **🎯 Form Validation** - Real-time input validation
- **⌨️ Keyboard Navigation** - Accessibility support
- **🎨 Visual Hierarchy** - Clear information structure

## 🧪 Testing

### Manual Testing

1. **Start both servers** (backend and frontend)
2. **Test item creation:**
   - Navigate to Add Items
   - Fill form with valid data
   - Upload images
   - Verify success message
3. **Test item viewing:**
   - Check items appear in grid
   - Click item to open modal
   - Navigate through images
4. **Test enquiry system:**
   - Open item modal
   - Fill enquiry form
   - Verify email is sent

### API Testing with Postman

Import the provided Postman collection or test manually:
```bash
# Health check
GET http://localhost:5000/api/health

# Get all items
GET http://localhost:5000/api/items

# Seed sample data
POST http://localhost:5000/api/seed
```

## 🚀 Deployment

### Backend Deployment (Heroku)

1. **Create Heroku app**
   ```bash
   heroku create your-app-name
   ```

2. **Set environment variables**
   ```bash
   heroku config:set MONGODB_URI=your_mongodb_uri
   heroku config:set EMAIL_USER=your_email
   heroku config:set EMAIL_PASS=your_password
   ```

3. **Deploy**
   ```bash
   git subtree push --prefix backend heroku main
   ```

### Frontend Deployment (Netlify/Vercel)

1. **Build the project**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag and drop `dist` folder to Netlify
   - Or connect GitHub repository

3. **Update API URL**
   ```javascript
   // In src/services/api.js
   const API_BASE_URL = 'https://your-backend-url.herokuapp.com/api';
   ```

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit changes** (`git commit -m 'Add amazing feature'`)
4. **Push to branch** (`git push origin feature/amazing-feature`)
5. **Open Pull Request**

### Development Guidelines

- **Follow React best practices** for frontend development
- **Use meaningful commit messages** following conventional commits
- **Write clean, documented code** with proper comments
- **Test your changes** before submitting
- **Ensure responsive design** works on all screen sizes

## 🐛 Troubleshooting

### Common Issues

**Backend won't start:**
- ✅ Check if MongoDB is running
- ✅ Verify `config.env` file exists and has correct values
- ✅ Ensure port 5000 is not in use

**Frontend won't connect to backend:**
- ✅ Verify backend is running on port 5000
- ✅ Check API base URL in `frontend/src/services/api.js`
- ✅ Ensure CORS is enabled on backend

**Images not uploading:**
- ✅ Check file size (max 5MB per image)
- ✅ Verify image format (JPG, PNG, GIF, WEBP)
- ✅ Ensure `uploads` directory exists and has write permissions

**Emails not sending:**
- ✅ Verify Gmail app password is correct
- ✅ Check that 2FA is enabled on Gmail account
- ✅ Ensure EMAIL_* environment variables are set

### Performance Tips

- **Optimize images** before uploading (recommended: < 2MB)
- **Use modern browsers** for best experience
- **Clear browser cache** if experiencing issues
- **Close unused browser tabs** for better performance

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Yaswant Soni**
- Email: yaswantsoni2005@gmail.com
- GitHub: [@yaswantsoni](https://github.com/yaswantsoni)

## 🙏 Acknowledgments

- **React Team** - For the amazing frontend library
- **Tailwind CSS** - For the utility-first CSS framework
- **MongoDB** - For the flexible NoSQL database
- **Node.js Community** - For the robust backend ecosystem

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Made with ❤️ by [Yaswant Soni](mailto:yaswantsoni2005@gmail.com)

</div> 
