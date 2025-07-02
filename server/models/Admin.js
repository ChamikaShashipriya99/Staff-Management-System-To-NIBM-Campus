import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  lecturerId: {
    type: String,
    required: true,
    unique: true
  }
}, {
  timestamps: true
});

const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);
export default Admin; 