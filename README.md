# 🏢 NIBM Staff Management System

## 📋 Overview

The NIBM Staff Management System is a comprehensive digital solution designed to streamline and modernize staff administration at NIBM Campus. This web-based platform provides a centralized system for managing all aspects of staff information, from personal details to professional documentation. Built with modern web technologies, it offers a secure, efficient, and user-friendly interface for administrators to handle staff-related operations seamlessly.

## ✨ Key Features

### Core Functionality
- **Staff Profile Management**
  - Complete staff information storage
  - Document management and storage
  - Professional history tracking
  - Contact information management

### Administrative Tools
- **Document Processing**
  - PDF report generation
  - Excel data export
  - Bulk data operations
  - Document version control

### User Experience
- **Modern Interface**
  - Responsive design for all devices
  - Intuitive navigation
  - Real-time data updates
  - Interactive dashboards

### System Features
- **Performance & Reliability**
  - Fast data retrieval
  - Automated backups
  - Error handling
  - System monitoring

### **🆕 Recent Improvements (Latest Update)**
- **Image Upload Optimization**
  - Automatic image compression (max 300x300 pixels)
  - File size validation (5MB limit)
  - JPEG quality optimization (80% quality)
  - Base64 encoding with size limits
- **Database Stability**
  - Fixed "offset out of range" errors
  - Enhanced error handling and validation
  - Improved data integrity checks
  - Better error messages for users

## 🛠️ Tech Stack

### Frontend
- **React.js** - Modern UI development
- **Bootstrap 5** - Responsive design framework
- **React Router** - Navigation management
- **Axios** - API communication
- **React Toastify** - User notifications
- **jsPDF & XLSX** - Document generation

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Multer** - File upload handling

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Staff-Management-System-To-NIBM-Campus
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Configure database**
   - Update `server/config/db.js` with your MongoDB connection string
   - Create admin user using the provided script

5. **Start the application**
   ```bash
   # Terminal 1 - Start server
   cd server
   npm start
   
   # Terminal 2 - Start client
   cd client
   npm start
   ```

## 🔐 Authentication

### Admin Access
- **Default Credentials:**
  - Email: `admin@gmail.com`
  - Password: `Admin123#`
- **Setup:** Run `node scripts/createAdmin.js` in the server directory

## 📁 Project Structure

```
Staff-Management-System-To-NIBM-Campus/
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/         # Main application pages
│   │   ├── components/    # Reusable components
│   │   └── App.js         # Main application component
│   └── package.json
├── server/                 # Node.js backend
│   ├── models/            # Database models
│   ├── routes/            # API endpoints
│   ├── config/            # Configuration files
│   ├── scripts/           # Database scripts
│   └── package.json
└── README.md
```

## 🎯 Features in Detail

### Staff Management
- **Add Staff Members**
  - Personal information (name, email, phone)
  - Professional details (position, department, join date)
  - Photo upload with automatic compression
  - Academic activities scheduling

- **Edit & Update**
  - Modify existing staff information
  - Update academic schedules
  - Change profile photos
  - Real-time data synchronization

- **Delete Staff**
  - Remove staff members from system
  - Confirmation dialogs for safety
  - Automatic data cleanup

### Academic Activities
- **Weekly Scheduling**
  - Monday through Sunday planning
  - Time slot management
  - Lecture hall assignments
  - Activity tracking

### Reporting & Export
- **PDF Generation**
  - Professional staff profiles
  - Search result exports
  - Customizable layouts
  - NIBM branding integration

- **Excel Export**
  - Data analysis ready
  - Bulk operations support
  - Multiple format options

### Search & Filter
- **Advanced Search**
  - Name, position, department search
  - Real-time filtering
  - Sort by multiple criteria
  - Search result highlighting

## 🔧 Troubleshooting

### Common Issues

#### **Image Upload Problems**
- **Error:** "offset out of range"
- **Solution:** System now automatically compresses images and validates file sizes
- **Limit:** Maximum 5MB file size

#### **Database Connection Issues**
- **Error:** "MongoDB connection failed"
- **Solution:** Check connection string in `server/config/db.js`
- **Verify:** MongoDB Atlas network access settings

#### **Staff Data Not Displaying**
- **Check:** Browser console for errors
- **Verify:** Server is running on port 5000
- **Ensure:** User is authenticated as admin

### Performance Tips
- Use images under 5MB for faster uploads
- Clear browser cache if experiencing display issues
- Check network tab for API call failures

## 📊 System Requirements

### Minimum Requirements
- **Browser:** Chrome 80+, Firefox 75+, Safari 13+
- **RAM:** 4GB
- **Storage:** 1GB free space
- **Network:** Stable internet connection

### Recommended
- **Browser:** Latest Chrome/Firefox/Safari
- **RAM:** 8GB+
- **Storage:** 5GB+ free space
- **Network:** High-speed internet

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 🆘 Support

For technical support or questions:
- Check the troubleshooting section above
- Review browser console for error messages
- Ensure all dependencies are properly installed
- Verify database connection and credentials

## 🔄 Version History

### v1.1.0 (Latest)
- ✅ Fixed image upload offset errors
- ✅ Added automatic image compression
- ✅ Enhanced file size validation
- ✅ Improved error handling
- ✅ Better user feedback messages

### v1.0.0
- 🎉 Initial release
- 🏗️ Basic staff management functionality
- 📱 Responsive design implementation
- 🔐 Admin authentication system

---

**Built with ❤️ for NIBM Campus**

