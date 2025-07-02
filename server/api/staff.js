import mongoose from 'mongoose';
import Staff from '../models/Staff.js';

const uri = process.env.MONGODB_URI;

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(uri);
  }
}

export default async function handler(req, res) {
  await connectDB();
  const { method, query, body } = req;

  // Handle /api/staff/:id for GET, PUT, DELETE
  if (query.id) {
    const staffId = query.id;
    if (method === 'GET') {
      try {
        const staff = await Staff.findById(staffId);
        if (!staff) return res.status(404).json({ message: 'Staff member not found' });
        return res.json(staff);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    } else if (method === 'PUT') {
      try {
        const staff = await Staff.findById(staffId);
        if (!staff) return res.status(404).json({ message: 'Staff member not found' });
        staff.name = body.name || staff.name;
        staff.email = body.email || staff.email;
        staff.phone = body.phone || staff.phone;
        staff.position = body.position || staff.position;
        staff.department = body.department || staff.department;
        staff.joinDate = body.joinDate || staff.joinDate;
        staff.photo = body.photo || staff.photo;
        if (body.academicActivities) staff.academicActivities = body.academicActivities;
        const updatedStaff = await staff.save();
        return res.json(updatedStaff);
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
    } else if (method === 'DELETE') {
      try {
        const staff = await Staff.findById(staffId);
        if (!staff) return res.status(404).json({ message: 'Staff member not found' });
        await staff.deleteOne();
        return res.json({ message: 'Staff member deleted successfully' });
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    } else {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  }

  // Handle /api/staff for GET, POST
  if (method === 'GET') {
    try {
      const staff = await Staff.find().select('name email phone position department photo').lean();
      return res.json(staff);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } else if (method === 'POST') {
    const staff = new Staff({
      name: body.name,
      email: body.email,
      phone: body.phone,
      position: body.position,
      department: body.department,
      joinDate: body.joinDate,
      photo: body.photo || 'https://via.placeholder.com/150',
      academicActivities: body.academicActivities || {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: []
      }
    });
    try {
      const newStaff = await staff.save();
      return res.status(201).json(newStaff);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
} 