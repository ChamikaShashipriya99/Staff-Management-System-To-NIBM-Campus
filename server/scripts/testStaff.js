const mongoose = require('mongoose');
const Staff = require('../models/Staff');
const connectDB = require('../config/db');

const testStaff = async () => {
  try {
    // Connect to database
    await connectDB();
    console.log('Connected to database successfully');

    // Check existing staff records
    const existingStaff = await Staff.find();
    console.log(`Found ${existingStaff.length} existing staff records:`);
    
    if (existingStaff.length > 0) {
      existingStaff.forEach((staff, index) => {
        console.log(`${index + 1}. ${staff.name} - ${staff.email} - ${staff.position}`);
      });
    } else {
      console.log('No staff records found in database');
    }

    // Test adding a new staff member
    console.log('\nTesting staff creation...');
    
    const testStaffData = {
      name: 'Test Staff Member',
      email: 'test@example.com',
      phone: '1234567890',
      position: 'Lecturer',
      department: 'Computer Science',
      joinDate: new Date('2024-01-01'),
      photo: 'https://via.placeholder.com/150',
      academicActivities: {
        monday: [{
          startTime: '09:00',
          endTime: '10:00',
          lectureHall: 'Room 101'
        }],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: []
      }
    };

    const newStaff = new Staff(testStaffData);
    const savedStaff = await newStaff.save();
    console.log('✅ Test staff member created successfully:', savedStaff.name);

    // Verify the staff member was saved
    const allStaff = await Staff.find();
    console.log(`\nTotal staff records after test: ${allStaff.length}`);

    // Clean up - remove test staff member
    await Staff.findByIdAndDelete(savedStaff._id);
    console.log('🧹 Test staff member removed');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error testing staff:', error);
    process.exit(1);
  }
};

testStaff();
