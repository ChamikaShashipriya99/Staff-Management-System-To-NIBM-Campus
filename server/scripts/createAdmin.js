const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const connectDB = require('../config/db');
const bcrypt = require('bcrypt');

const createAdmin = async () => {
  try {
    // Connect to database
    await connectDB();

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@gmail.com' });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash('Admin123#', 10);

    // Create new admin
    const admin = new Admin({
      email: 'admin@gmail.com',
      password: hashedPassword,
      name: 'Admin',
      lecturerId: 'admin001'
    });

    await admin.save();
    console.log('Admin user created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin(); 