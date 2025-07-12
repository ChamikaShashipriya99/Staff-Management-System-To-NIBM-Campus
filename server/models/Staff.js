const mongoose = require('mongoose');

// Schema for academic activities
const activitySchema = new mongoose.Schema({
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  lectureHall: {
    type: String,
    required: true
  }
});

// Schema for weekly schedule
const weeklyScheduleSchema = new mongoose.Schema({
  monday: [activitySchema],
  tuesday: [activitySchema],
  wednesday: [activitySchema],
  thursday: [activitySchema],
  friday: [activitySchema],
  saturday: [activitySchema],
  sunday: [activitySchema]
});

const staffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  joinDate: {
    type: Date,
    required: true
  },
  photo: {
    type: String,
    default: 'https://via.placeholder.com/150' // Default placeholder image
  },
  academicActivities: {
    type: weeklyScheduleSchema,
    default: () => ({
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: []
    })
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Staff', staffSchema); 