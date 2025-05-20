import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const StaffList = ({ onAddStaff }) => {
  const [staffData, setStaffData] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    position: '',
    email: '',
    phone: '',
    department: '',
    joinDate: '',
    photo: '',
    academicActivities: {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: []
    }
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/staff');
      setStaffData(response.data);
    } catch (error) {
      console.error('Error fetching staff:', error);
      toast.error('Failed to fetch staff data');
    }
  };

  const handleDelete = async (staffId) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      try {
        await axios.delete(`http://localhost:5000/api/staff/${staffId}`);
        await fetchStaff();
        toast.success('Staff member deleted successfully');
      } catch (error) {
        console.error('Error deleting staff:', error);
        toast.error('Failed to delete staff member');
      }
    }
  };

  const handleEdit = (staff) => {
    // Ensure academicActivities has the correct structure
    const academicActivities = {
      monday: Array.isArray(staff.academicActivities?.monday) ? staff.academicActivities.monday : [],
      tuesday: Array.isArray(staff.academicActivities?.tuesday) ? staff.academicActivities.tuesday : [],
      wednesday: Array.isArray(staff.academicActivities?.wednesday) ? staff.academicActivities.wednesday : [],
      thursday: Array.isArray(staff.academicActivities?.thursday) ? staff.academicActivities.thursday : [],
      friday: Array.isArray(staff.academicActivities?.friday) ? staff.academicActivities.friday : [],
      saturday: Array.isArray(staff.academicActivities?.saturday) ? staff.academicActivities.saturday : [],
      sunday: Array.isArray(staff.academicActivities?.sunday) ? staff.academicActivities.sunday : []
    };

    setSelectedStaff(staff);
    setEditForm({
      name: staff.name,
      position: staff.position,
      email: staff.email,
      phone: staff.phone,
      department: staff.department,
      joinDate: new Date(staff.joinDate).toISOString().split('T')[0],
      photo: staff.photo,
      academicActivities: academicActivities
    });
    setPreviewUrl(staff.photo);
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Ensure academicActivities has the correct structure before sending
      const updatedData = {
        ...editForm,
        academicActivities: Object.entries(editForm.academicActivities).reduce((acc, [day, activities]) => {
          acc[day] = Array.isArray(activities) ? activities.filter(activity => 
            activity.startTime && activity.endTime && activity.lectureHall
          ) : [];
          return acc;
        }, {
          monday: [],
          tuesday: [],
          wednesday: [],
          thursday: [],
          friday: [],
          saturday: [],
          sunday: []
        })
      };

      await axios.put(`http://localhost:5000/api/staff/${selectedStaff._id}`, updatedData);
      setShowEditModal(false);
      await fetchStaff();
      toast.success('Staff member updated successfully');
    } catch (error) {
      console.error('Error updating staff:', error);
      toast.error('Failed to update staff member');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
        setEditForm(prev => ({
          ...prev,
          photo: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addActivity = (day) => {
    setEditForm(prev => ({
      ...prev,
      academicActivities: {
        ...prev.academicActivities,
        [day]: [
          ...(Array.isArray(prev.academicActivities[day]) ? prev.academicActivities[day] : []),
          { startTime: '', endTime: '', lectureHall: '' }
        ]
      }
    }));
  };

  const removeActivity = (day, index) => {
    setEditForm(prev => ({
      ...prev,
      academicActivities: {
        ...prev.academicActivities,
        [day]: Array.isArray(prev.academicActivities[day]) 
          ? prev.academicActivities[day].filter((_, i) => i !== index)
          : []
      }
    }));
  };

  const handleActivityChange = (day, index, field, value) => {
    setEditForm(prev => ({
      ...prev,
      academicActivities: {
        ...prev.academicActivities,
        [day]: Array.isArray(prev.academicActivities[day])
          ? prev.academicActivities[day].map((activity, i) => 
              i === index ? { ...activity, [field]: value } : activity
            )
          : []
      }
    }));
  };

  const renderActivityInputs = (day, activities) => {
    return (
      <div className="mb-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="text-primary mb-0">{day.charAt(0).toUpperCase() + day.slice(1)}</h6>
          <button
            type="button"
            className="btn btn-sm btn-outline-primary"
            onClick={() => addActivity(day)}
          >
            <i className="fas fa-plus me-1"></i>Add Activity
          </button>
        </div>
        {activities.map((activity, index) => (
          <div key={index} className="card mb-2 p-3">
            <div className="row g-3">
              <div className="col-md-4">
                <div className="form-floating">
                  <input
                    type="time"
                    className="form-control"
                    value={activity.startTime}
                    onChange={(e) => handleActivityChange(day, index, 'startTime', e.target.value)}
                    required
                  />
                  <label>Start Time</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-floating">
                  <input
                    type="time"
                    className="form-control"
                    value={activity.endTime}
                    onChange={(e) => handleActivityChange(day, index, 'endTime', e.target.value)}
                    required
                  />
                  <label>End Time</label>
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    value={activity.lectureHall}
                    onChange={(e) => handleActivityChange(day, index, 'lectureHall', e.target.value)}
                    placeholder="Lecture Hall"
                    required
                  />
                  <label>Lecture Hall</label>
                </div>
              </div>
              <div className="col-md-1 d-flex align-items-center">
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => removeActivity(day, index)}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderStaffCard = (staff) => {
    // Debug log to check the data structure
    console.log('Staff data:', staff);
    console.log('Academic activities:', staff.academicActivities);

    // Ensure academicActivities exists and has the correct structure
    const academicActivities = staff.academicActivities || {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: []
    };

    const hasActivities = Object.values(academicActivities).some(activities => 
      Array.isArray(activities) && activities.length > 0
    );
    
    return (
      <div className="col-md-6 col-lg-4 mb-4">
        <div className="card border-0 shadow-lg h-100" style={{ borderRadius: '20px' }}>
          <div className="card-body p-4">
            <div className="text-center mb-4">
              <img
                src={staff.photo}
                alt={staff.name}
                className="rounded-circle mb-3"
                style={{
                  width: '120px',
                  height: '120px',
                  objectFit: 'cover',
                  border: '4px solid white',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                }}
              />
              <h4 className="mb-1">{staff.name}</h4>
              <p className="text-muted mb-2">{staff.position}</p>
              <div className="d-flex justify-content-center gap-2">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => handleEdit(staff)}
                >
                  <i className="fas fa-edit me-1"></i>
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(staff._id)}
                >
                  <i className="fas fa-trash me-1"></i>
                  Delete
                </button>
              </div>
            </div>

            <div className="border-top pt-3">
              <div className="row g-3">
                <div className="col-12">
                  <p className="mb-1">
                    <i className="fas fa-envelope text-primary me-2"></i>
                    {staff.email}
                  </p>
                </div>
                <div className="col-12">
                  <p className="mb-1">
                    <i className="fas fa-phone text-primary me-2"></i>
                    {staff.phone}
                  </p>
                </div>
                <div className="col-12">
                  <p className="mb-1">
                    <i className="fas fa-building text-primary me-2"></i>
                    {staff.department}
                  </p>
                </div>
                <div className="col-12">
                  <p className="mb-1">
                    <i className="fas fa-calendar-alt text-primary me-2"></i>
                    Joined: {new Date(staff.joinDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {hasActivities && (
              <div className="border-top pt-3 mt-3">
                <h6 className="text-primary mb-3">
                  <i className="fas fa-clock me-2"></i>
                  Weekly Schedule
                </h6>
                <div className="schedule-container" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  {Object.entries(academicActivities).map(([day, activities]) => {
                    // Ensure activities is an array
                    const activitiesArray = Array.isArray(activities) ? activities : [];
                    if (activitiesArray.length === 0) return null;
                    
                    return (
                      <div key={day} className="mb-3">
                        <div className="d-flex align-items-center mb-2">
                          <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-2">
                            <i className="fas fa-calendar-day text-primary"></i>
                          </div>
                          <h6 className="mb-0 text-primary">{day.charAt(0).toUpperCase() + day.slice(1)}</h6>
                        </div>
                        <div className="ps-4">
                          {activitiesArray.map((activity, index) => (
                            <div 
                              key={index} 
                              className="card mb-2 border-0 bg-light"
                              style={{ borderRadius: '10px' }}
                            >
                              <div className="card-body p-2">
                                <div className="d-flex justify-content-between align-items-center">
                                  <div>
                                    <small className="text-muted d-block">
                                      <i className="fas fa-clock me-1"></i>
                                      {activity.startTime || ''} - {activity.endTime || ''}
                                    </small>
                                    <small className="text-primary">
                                      <i className="fas fa-door-open me-1"></i>
                                      {activity.lectureHall || ''}
                                    </small>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-primary mb-0">
          <i className="fas fa-users me-2"></i>
          Staff List
        </h3>
        <button 
          className="btn btn-primary"
          onClick={onAddStaff}
        >
          <i className="fas fa-plus me-2"></i>
          Add New Staff
        </button>
      </div>

      <div className="row">
        {staffData.map(staff => renderStaffCard(staff))}
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '20px' }}>
              <div className="modal-body p-0">
                <div className="card border-0" style={{ borderRadius: '20px' }}>
                  <div className="card-body p-5">
                    <div className="d-flex align-items-center mb-4">
                      <div className="bg-primary bg-opacity-10 rounded-circle p-3 me-3">
                        <i className="fas fa-user-edit text-primary fa-2x"></i>
                      </div>
                      <div>
                        <h3 className="text-primary mb-1">Edit Staff Member</h3>
                        <p className="text-muted mb-0">Update the staff member's information</p>
                      </div>
                      <button 
                        type="button" 
                        className="btn-close ms-auto" 
                        onClick={() => setShowEditModal(false)}
                      ></button>
                    </div>

                    <form onSubmit={handleEditSubmit}>
                      <div className="row">
                        {/* Photo Upload Section */}
                        <div className="col-md-4 mb-4">
                          <div className="card border-0 bg-white shadow-sm" 
                            style={{ 
                              borderRadius: '15px',
                              transition: 'all 0.3s ease'
                            }}>
                            <div className="card-body text-center p-4">
                              <div className="mb-4 position-relative">
                                <div className="position-relative d-inline-block">
                                  <img 
                                    src={previewUrl} 
                                    alt="Staff Preview" 
                                    className="rounded-circle shadow"
                                    style={{ 
                                      width: '180px', 
                                      height: '180px', 
                                      objectFit: 'cover',
                                      border: '4px solid white',
                                      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                                      transition: 'all 0.3s ease'
                                    }} 
                                  />
                                  <div className="position-absolute bottom-0 end-0">
                                    <label className="btn btn-primary rounded-circle p-2 shadow-sm" 
                                      style={{ 
                                        width: '40px', 
                                        height: '40px',
                                        cursor: 'pointer'
                                      }}>
                                      <i className="fas fa-camera"></i>
                                      <input 
                                        type="file" 
                                        className="d-none" 
                                        accept="image/*"
                                        onChange={handleFileChange}
                                      />
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div className="mb-3">
                                <label className="btn btn-outline-primary w-100 py-2" 
                                  style={{ 
                                    borderRadius: '10px',
                                    transition: 'all 0.3s ease'
                                  }}>
                                  <i className="fas fa-upload me-2"></i>
                                  Change Photo
                                  <input 
                                    type="file" 
                                    className="d-none" 
                                    accept="image/*"
                                    onChange={handleFileChange}
                                  />
                                </label>
                              </div>
                              <small className="text-muted d-block">
                                <i className="fas fa-info-circle me-1"></i>
                                Recommended size: 180x180 pixels
                              </small>
                            </div>
                          </div>
                        </div>

                        {/* Form Fields Section */}
                        <div className="col-md-8">
                          <div className="card border-0 bg-white shadow-sm p-4" 
                            style={{ borderRadius: '15px' }}>
                            <div className="row g-4">
                              <div className="col-md-6">
                                <div className="form-floating">
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={editForm.name}
                                    onChange={handleInputChange}
                                    placeholder="Full Name"
                                    required
                                    style={{ borderRadius: '10px' }}
                                  />
                                  <label htmlFor="name">Full Name</label>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-floating">
                                  <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    value={editForm.email}
                                    onChange={handleInputChange}
                                    placeholder="Email"
                                    required
                                    style={{ borderRadius: '10px' }}
                                  />
                                  <label htmlFor="email">Email</label>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-floating">
                                  <input
                                    type="tel"
                                    className="form-control"
                                    id="phone"
                                    name="phone"
                                    value={editForm.phone}
                                    onChange={handleInputChange}
                                    placeholder="Phone"
                                    required
                                    style={{ borderRadius: '10px' }}
                                  />
                                  <label htmlFor="phone">Phone</label>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-floating">
                                  <select
                                    className="form-select"
                                    id="position"
                                    name="position"
                                    value={editForm.position}
                                    onChange={handleInputChange}
                                    required
                                    style={{ borderRadius: '10px' }}
                                  >
                                    <option value="">Select Position</option>
                                    <option value="Lecturer">Lecturer</option>
                                    <option value="Assistant Lecturer">Assistant Lecturer</option>
                                    <option value="Senior Lecturer">Senior Lecturer</option>
                                    <option value="Professor">Professor</option>
                                    <option value="Head of Department">Head of Department</option>
                                  </select>
                                  <label htmlFor="position">Position</label>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-floating">
                                  <select
                                    className="form-select"
                                    id="department"
                                    name="department"
                                    value={editForm.department}
                                    onChange={handleInputChange}
                                    required
                                    style={{ borderRadius: '10px' }}
                                  >
                                    <option value="">Select Department</option>
                                    <option value="Computer Science">Computer Science</option>
                                    <option value="Information Technology">Information Technology</option>
                                    <option value="Software Engineering">Software Engineering</option>
                                    <option value="Network Engineering">Network Engineering</option>
                                  </select>
                                  <label htmlFor="department">Department</label>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-floating">
                                  <input
                                    type="date"
                                    className="form-control"
                                    id="joinDate"
                                    name="joinDate"
                                    value={editForm.joinDate}
                                    onChange={handleInputChange}
                                    required
                                    style={{ borderRadius: '10px' }}
                                  />
                                  <label htmlFor="joinDate">Join Date</label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Academic Activities Section */}
                      <div className="card border-0 bg-white shadow-sm mt-4 p-4" style={{ borderRadius: '15px' }}>
                        <div className="d-flex align-items-center mb-4">
                          <div className="bg-primary bg-opacity-10 rounded-circle p-3 me-3">
                            <i className="fas fa-calendar-alt text-primary fa-2x"></i>
                          </div>
                          <div>
                            <h3 className="text-primary mb-1">Academic Activities</h3>
                            <p className="text-muted mb-0">Schedule weekly academic activities</p>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12">
                            {Object.entries(editForm.academicActivities).map(([day, activities]) => (
                              <div key={day} className="mb-4">
                                {renderActivityInputs(day, activities)}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 text-end">
                        <button
                          type="submit"
                          className="btn btn-primary px-5 py-2"
                          disabled={isSubmitting}
                          style={{ 
                            borderRadius: '10px',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          {isSubmitting ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                              Updating...
                            </>
                          ) : (
                            <>
                              <i className="fas fa-save me-2"></i>
                              Update Staff Member
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffList; 