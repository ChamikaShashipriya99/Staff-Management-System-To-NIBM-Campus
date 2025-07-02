import React, { useState } from 'react';
import axios from 'axios';

const AddStaff = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    joinDate: '',
    photo: 'https://via.placeholder.com/150',
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
  const [previewUrl, setPreviewUrl] = useState('https://via.placeholder.com/150');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
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
        setFormData(prevState => ({
          ...prevState,
          photo: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addActivity = (day) => {
    setFormData(prevState => ({
      ...prevState,
      academicActivities: {
        ...prevState.academicActivities,
        [day]: [
          ...prevState.academicActivities[day],
          { startTime: '', endTime: '', lectureHall: '' }
        ]
      }
    }));
  };

  const removeActivity = (day, index) => {
    setFormData(prevState => ({
      ...prevState,
      academicActivities: {
        ...prevState.academicActivities,
        [day]: prevState.academicActivities[day].filter((_, i) => i !== index)
      }
    }));
  };

  const handleActivityChange = (day, index, field, value) => {
    setFormData(prevState => ({
      ...prevState,
      academicActivities: {
        ...prevState.academicActivities,
        [day]: prevState.academicActivities[day].map((activity, i) => 
          i === index ? { ...activity, [field]: value } : activity
        )
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.position || !formData.department || !formData.joinDate) {
      alert('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    // Validate academic activities
    const hasValidActivities = Object.entries(formData.academicActivities).some(([day, activities]) => {
      return Array.isArray(activities) && activities.some(activity => 
        activity.startTime && activity.endTime && activity.lectureHall
      );
    });

    if (!hasValidActivities) {
      alert('Please add at least one academic activity');
      setIsSubmitting(false);
      return;
    }

    try {
      // Format the data for submission
      const staffData = {
        ...formData,
        joinDate: new Date(formData.joinDate).toISOString(),
        academicActivities: Object.entries(formData.academicActivities).reduce((acc, [day, activities]) => {
          // Only include activities that have all required fields
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

      console.log('Submitting staff data:', staffData);

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/staff`, staffData);
      
      if (response.status === 201) {
        alert('Staff member added successfully!');
        onSuccess(); // Call the success callback to refresh the staff list
      }
    } catch (error) {
      console.error('Error adding staff:', error);
      alert(error.response?.data?.message || 'Failed to add staff member. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderActivityInputs = (day, activities) => {
    // Ensure activities is an array
    const activitiesArray = Array.isArray(activities) ? activities : [];
    
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
        {activitiesArray.map((activity, index) => (
          <div key={index} className="card mb-2 p-3">
            <div className="row g-3">
              <div className="col-md-4">
                <div className="form-floating">
                  <input
                    type="time"
                    className="form-control"
                    value={activity.startTime || ''}
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
                    value={activity.endTime || ''}
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
                    value={activity.lectureHall || ''}
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

  return (
    <div className="mt-4">
      <div className="card border-0 shadow-lg" 
        style={{ 
          borderRadius: '20px',
          background: 'linear-gradient(to bottom right, #ffffff, #f8f9fa)'
        }}>
        <div className="card-body p-5">
          <div className="d-flex align-items-center mb-4">
            <div className="bg-primary bg-opacity-10 rounded-circle p-3 me-3">
              <i className="fas fa-user-plus text-primary fa-2x"></i>
            </div>
            <div>
              <h3 className="text-primary mb-1">Add New Staff Member</h3>
              <p className="text-muted mb-0">Fill in the details to add a new staff member</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
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
                        Choose Photo
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
                          value={formData.name}
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
                          value={formData.email}
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
                          value={formData.phone}
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
                          value={formData.position}
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
                          value={formData.department}
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
                          value={formData.joinDate}
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
                  {Object.entries(formData.academicActivities).map(([day, activities]) => (
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
                    Adding...
                  </>
                ) : (
                  <>
                    <i className="fas fa-save me-2"></i>
                    Add Staff Member
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStaff; 