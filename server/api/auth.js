import mongoose from 'mongoose';
import Admin from '../models/Admin.js';
import Lecturer from '../models/Lecturer.js';
import bcrypt from 'bcryptjs';

const uri = process.env.MONGODB_URI;

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(uri);
  }
}

export default async function handler(req, res) {
  await connectDB();
  const { method, query, body } = req;

  // Admin login: POST /api/auth/login
  if (method === 'POST' && query.login !== undefined) {
    try {
      const { email, password } = body;
      const admin = await Admin.findOne({ email });
      if (!admin) return res.status(401).json({ message: 'Invalid email or password' });
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });
      return res.json({ success: true });
    } catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
  }

  // Admin registration: POST /api/auth/register
  if (method === 'POST' && query.register !== undefined) {
    try {
      const { name, lecturerId, email, password } = body;
      if (!name || !lecturerId || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }
      const existing = await Admin.findOne({ $or: [{ email }, { lecturerId }] });
      if (existing) return res.status(409).json({ message: 'Email or Lecturer ID already exists' });
      const hashedPassword = await bcrypt.hash(password, 10);
      const admin = new Admin({ name, lecturerId, email, password: hashedPassword });
      await admin.save();
      return res.json({ success: true });
    } catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
  }

  // Lecturer registration: POST /api/auth/lecturer/register
  if (method === 'POST' && query['lecturer/register'] !== undefined) {
    try {
      const { name, lecturerId, email, password } = body;
      if (!name || !lecturerId || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }
      const existing = await Lecturer.findOne({ $or: [{ email }, { lecturerId }] });
      if (existing) return res.status(409).json({ message: 'Email or Lecturer ID already exists' });
      const hashedPassword = await bcrypt.hash(password, 10);
      const lecturer = new Lecturer({ name, lecturerId, email, password: hashedPassword });
      await lecturer.save();
      return res.json({ success: true });
    } catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
  }

  // Lecturer login: POST /api/auth/lecturer/login
  if (method === 'POST' && query['lecturer/login'] !== undefined) {
    try {
      const { email, password } = body;
      const lecturer = await Lecturer.findOne({ email });
      if (!lecturer) return res.status(401).json({ message: 'Invalid email or password' });
      const isMatch = await bcrypt.compare(password, lecturer.password);
      if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });
      return res.json({ success: true });
    } catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
  }

  // Get all lecturers: GET /api/auth/lecturers
  if (method === 'GET' && query.lecturers !== undefined) {
    try {
      const lecturers = await Lecturer.find().select('name email lecturerId');
      return res.json(lecturers);
    } catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
  }

  return res.status(404).json({ message: 'Not Found' });
} 