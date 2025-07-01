const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find admin by email
    const admin = await Admin.findOne({ email });
    
    if (!admin) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Login successful
    res.json({ success: true });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin registration
router.post('/register', async (req, res) => {
  try {
    const { name, lecturerId, email, password } = req.body;
    if (!name || !lecturerId || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    // Check for existing email or lecturerId
    const existing = await Admin.findOne({ $or: [{ email }, { lecturerId }] });
    if (existing) {
      return res.status(409).json({ message: 'Email or Lecturer ID already exists' });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ name, lecturerId, email, password: hashedPassword });
    await admin.save();
    res.json({ success: true });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 