const express = require('express');
const router = express.Router();
const Staff = require('../models/Staff');

// Get all staff
router.get('/', async (req, res) => {
  try {
    // Only select fields needed for the list
    const staff = await Staff.find().select('name email phone position department photo').lean();
    res.json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new staff
router.post('/', async (req, res) => {
  const staff = new Staff({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    position: req.body.position,
    department: req.body.department,
    joinDate: req.body.joinDate,
    photo: req.body.photo || 'https://via.placeholder.com/150',
    academicActivities: req.body.academicActivities || {
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
    res.status(201).json(newStaff);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update staff
router.put('/:id', async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) {
      return res.status(404).json({ message: 'Staff member not found' });
    }

    // Update basic information
    staff.name = req.body.name || staff.name;
    staff.email = req.body.email || staff.email;
    staff.phone = req.body.phone || staff.phone;
    staff.position = req.body.position || staff.position;
    staff.department = req.body.department || staff.department;
    staff.joinDate = req.body.joinDate || staff.joinDate;
    staff.photo = req.body.photo || staff.photo;

    // Update academic activities if provided
    if (req.body.academicActivities) {
      staff.academicActivities = req.body.academicActivities;
    }

    const updatedStaff = await staff.save();
    res.json(updatedStaff);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete staff
router.delete('/:id', async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) {
      return res.status(404).json({ message: 'Staff member not found' });
    }

    await staff.deleteOne();
    res.json({ message: 'Staff member deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get staff by ID
router.get('/:id', async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) {
      return res.status(404).json({ message: 'Staff member not found' });
    }
    res.json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 