import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const StaffList = ({ onAddStaff, staffData, onStaffUpdate, isLoading }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
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
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);

  const handleDelete = async (staffId) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      try {
        await axios.delete(`http://localhost:5000/api/staff/${staffId}`);
        onStaffUpdate(); // Call the parent's update function
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
      onStaffUpdate(); // Call the parent's update function
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

  const filteredAndSortedStaff = staffData
    .filter(staff => {
      const searchLower = searchTerm.toLowerCase();
      return (
        staff.name.toLowerCase().includes(searchLower) ||
        staff.position.toLowerCase().includes(searchLower) ||
        staff.department.toLowerCase().includes(searchLower) ||
        staff.email.toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortField === 'joinDate') {
        comparison = new Date(a[sortField]) - new Date(b[sortField]);
      } else {
        comparison = a[sortField].localeCompare(b[sortField]);
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });

  // Calculate unique departments
  const uniqueDepartments = new Set(staffData.map(staff => staff.department));
  const totalDepartments = uniqueDepartments.size;

  // Calculate staff by position
  const staffByPosition = staffData.reduce((acc, staff) => {
    acc[staff.position] = (acc[staff.position] || 0) + 1;
    return acc;
  }, {});

  // Calculate staff by department
  const staffByDepartment = staffData.reduce((acc, staff) => {
    acc[staff.department] = (acc[staff.department] || 0) + 1;
    return acc;
  }, {});

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const downloadCSV = () => {
    const headers = [
      'Name', 'Position', 'Email', 'Phone', 'Department', 'Join Date',
      'Monday Schedule', 'Tuesday Schedule', 'Wednesday Schedule',
      'Thursday Schedule', 'Friday Schedule', 'Saturday Schedule', 'Sunday Schedule'
    ];

    const csvData = filteredAndSortedStaff.map(staff => {
      const scheduleText = Object.entries(staff.academicActivities || {}).map(([day, activities]) => {
        if (!Array.isArray(activities) || activities.length === 0) return 'No activities';
        return activities.map(activity => 
          `${activity.startTime}-${activity.endTime} (${activity.lectureHall})`
        ).join('; ');
      });

      return [
        staff.name,
        staff.position,
        staff.email,
        staff.phone,
        staff.department,
        new Date(staff.joinDate).toLocaleDateString(),
        ...scheduleText
      ];
    });

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `staff_list_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const downloadExcel = () => {
    const staffData = filteredAndSortedStaff.map(staff => {
      const scheduleData = {};
      Object.entries(staff.academicActivities || {}).forEach(([day, activities]) => {
        if (Array.isArray(activities) && activities.length > 0) {
          scheduleData[`${day} Schedule`] = activities.map(activity => 
            `${activity.startTime}-${activity.endTime} (${activity.lectureHall})`
          ).join('; ');
        } else {
          scheduleData[`${day} Schedule`] = 'No activities';
        }
      });

      return {
        Name: staff.name,
        Position: staff.position,
        Email: staff.email,
        Phone: staff.phone,
        Department: staff.department,
        'Join Date': new Date(staff.joinDate).toLocaleDateString(),
        ...scheduleData
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(staffData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Staff List');
    XLSX.writeFile(workbook, `staff_list_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    
    filteredAndSortedStaff.forEach((staff, index) => {
      // Add new page for each staff member (except first one)
      if (index > 0) {
        doc.addPage();
      }

      // Header with logo and title
      doc.setFillColor(232, 240, 254);
      doc.rect(0, 0, 210, 30, 'F');
      
      // Add NIBM logo
      try {
        const logoUrl = '/images/nibm-logo.jpeg';
        doc.addImage(logoUrl, 'JPEG', 15, 5, 40, 20, undefined, 'FAST');
      } catch (error) {
        console.error('Error adding logo to PDF:', error);
      }
      
      // Title
      doc.setFontSize(24);
      doc.setTextColor(13, 110, 253);
      doc.text('NIBM Staff Profiles', 105, 15, { align: 'center' });
      
      // Date
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 25, { align: 'center' });

      // Staff Information Section with Photo
      doc.setFillColor(248, 249, 250);
      doc.rect(10, 50, 190, 50, 'F');
      
      // Add staff photo
      if (staff.photo) {
        try {
          doc.setDrawColor(255, 255, 255);
          doc.setLineWidth(2);
          doc.rect(20, 55, 40, 40, 'F');
          doc.addImage(staff.photo, 'JPEG', 20, 55, 40, 40, undefined, 'FAST');
          doc.rect(20, 55, 40, 40, 'S');
        } catch (error) {
          console.error('Error adding image to PDF:', error);
        }
      }
      
      // Staff Name and Position
      doc.setFontSize(18);
      doc.setTextColor(13, 110, 253);
      doc.text(staff.name, 70, 65);
      
      doc.setFontSize(12);
      doc.setTextColor(100, 100, 100);
      doc.text(staff.position, 70, 75);

      // Contact Information Section
      doc.setFontSize(12);
      doc.setTextColor(13, 110, 253);
      doc.text('Contact Information', 20, 115);
      
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`Email: ${staff.email}`, 20, 125);
      doc.text(`Phone: ${staff.phone}`, 20, 135);
      doc.text(`Department: ${staff.department}`, 20, 145);
      doc.text(`Join Date: ${new Date(staff.joinDate).toLocaleDateString()}`, 20, 155);

      // Academic Schedule Section
      const hasActivities = Object.values(staff.academicActivities || {}).some(activities => 
        Array.isArray(activities) && activities.length > 0
      );

      if (hasActivities) {
        doc.setFontSize(12);
        doc.setTextColor(13, 110, 253);
        doc.text('Weekly Schedule', 20, 175);

        let yPosition = 185;
        Object.entries(staff.academicActivities).forEach(([day, activities]) => {
          if (Array.isArray(activities) && activities.length > 0) {
            // Day header
            doc.setFontSize(10);
            doc.setTextColor(13, 110, 253);
            const dayText = day.charAt(0).toUpperCase() + day.slice(1);
            doc.text(dayText, 25, yPosition);
            yPosition += 7;

            // Activities
            doc.setTextColor(100, 100, 100);
            activities.forEach(activity => {
              doc.text(`• ${activity.startTime} - ${activity.endTime} (${activity.lectureHall})`, 30, yPosition);
              yPosition += 7;
            });
            yPosition += 3; // Add space between days
          }
        });
      }

      // Footer
      doc.setDrawColor(220, 220, 220);
      doc.line(10, 280, 200, 280);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text('NIBM Staff Management System', 105, 290, { align: 'center' });
      doc.text(`Page ${index + 1} of ${filteredAndSortedStaff.length}`, 105, 295, { align: 'center' });
    });

    doc.save(`staff_directory_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const downloadSearchResults = () => {
    if (filteredAndSortedStaff.length === 0) {
      toast.warning('No search results to download');
      return;
    }

    const doc = new jsPDF();
    
    filteredAndSortedStaff.forEach((staff, index) => {
      // Add new page for each staff member (except first one)
      if (index > 0) {
        doc.addPage();
      }

      // Header with logo and title
      doc.setFillColor(232, 240, 254);
      doc.rect(0, 0, 210, 40, 'F');
      
      // Add NIBM logo
      try {
        const logoUrl = '/images/nibm-logo.jpeg';
        doc.addImage(logoUrl, 'JPEG', 15, 5, 40, 20, undefined, 'FAST');
      } catch (error) {
        console.error('Error adding logo to PDF:', error);
      }
      
      // Title
      doc.setFontSize(24);
      doc.setTextColor(13, 110, 253);
      doc.text('Search Results', 105, 15, { align: 'center' });
      
      // Search Criteria
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`Search Term: "${searchTerm}"`, 105, 25, { align: 'center' });
      doc.text(`Sort By: ${sortField} (${sortDirection})`, 105, 30, { align: 'center' });
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 35, { align: 'center' });

      // Staff Information Section with Photo
      doc.setFillColor(248, 249, 250);
      doc.rect(10, 50, 190, 50, 'F');
      
      // Add staff photo
      if (staff.photo) {
        try {
          doc.setDrawColor(255, 255, 255);
          doc.setLineWidth(2);
          doc.rect(20, 55, 40, 40, 'F');
          doc.addImage(staff.photo, 'JPEG', 20, 55, 40, 40, undefined, 'FAST');
          doc.rect(20, 55, 40, 40, 'S');
        } catch (error) {
          console.error('Error adding image to PDF:', error);
        }
      }
      
      // Staff Name and Position
      doc.setFontSize(18);
      doc.setTextColor(13, 110, 253);
      doc.text(staff.name, 70, 65);
      
      doc.setFontSize(12);
      doc.setTextColor(100, 100, 100);
      doc.text(staff.position, 70, 75);

      // Contact Information Section
      doc.setFontSize(12);
      doc.setTextColor(13, 110, 253);
      doc.text('Contact Information', 20, 115);
      
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`Email: ${staff.email}`, 20, 125);
      doc.text(`Phone: ${staff.phone}`, 20, 135);
      doc.text(`Department: ${staff.department}`, 20, 145);
      doc.text(`Join Date: ${new Date(staff.joinDate).toLocaleDateString()}`, 20, 155);

      // Academic Schedule Section
      const hasActivities = Object.values(staff.academicActivities || {}).some(activities => 
        Array.isArray(activities) && activities.length > 0
      );

      if (hasActivities) {
        doc.setFontSize(12);
        doc.setTextColor(13, 110, 253);
        doc.text('Weekly Schedule', 20, 175);

        let yPosition = 185;
        Object.entries(staff.academicActivities).forEach(([day, activities]) => {
          if (Array.isArray(activities) && activities.length > 0) {
            // Day header
            doc.setFontSize(10);
            doc.setTextColor(13, 110, 253);
            const dayText = day.charAt(0).toUpperCase() + day.slice(1);
            doc.text(dayText, 25, yPosition);
            yPosition += 7;

            // Activities
            doc.setTextColor(100, 100, 100);
            activities.forEach(activity => {
              doc.text(`• ${activity.startTime} - ${activity.endTime} (${activity.lectureHall})`, 30, yPosition);
              yPosition += 7;
            });
            yPosition += 3; // Add space between days
          }
        });
      }

      // Footer
      doc.setDrawColor(220, 220, 220);
      doc.line(10, 280, 200, 280);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text('NIBM Staff Management System', 105, 290, { align: 'center' });
      doc.text(`Page ${index + 1} of ${filteredAndSortedStaff.length}`, 105, 295, { align: 'center' });
    });

    doc.save(`search_results_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const downloadSearchResultsExcel = () => {
    if (filteredAndSortedStaff.length === 0) {
      toast.warning('No search results to download');
      return;
    }

    const data = filteredAndSortedStaff.map(staff => ({
      Name: staff.name,
      Position: staff.position,
      Department: staff.department,
      Email: staff.email,
      Phone: staff.phone,
      'Join Date': new Date(staff.joinDate).toLocaleDateString(),
      'Academic Schedule': Object.entries(staff.academicActivities || {})
        .map(([day, activities]) => {
          if (!Array.isArray(activities) || activities.length === 0) return '';
          return `${day}: ${activities.map(a => 
            `${a.startTime}-${a.endTime} (${a.lectureHall})`
          ).join('; ')}`;
        })
        .filter(schedule => schedule !== '')
        .join(' | ')
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Search Results');
    XLSX.writeFile(workbook, `search_results_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const downloadSearchResultsCSV = () => {
    if (filteredAndSortedStaff.length === 0) {
      toast.warning('No search results to download');
      return;
    }

    const headers = [
      'Name', 'Position', 'Department', 'Email', 'Phone', 'Join Date', 'Academic Schedule'
    ];

    const csvData = filteredAndSortedStaff.map(staff => {
      const scheduleText = Object.entries(staff.academicActivities || {})
        .map(([day, activities]) => {
          if (!Array.isArray(activities) || activities.length === 0) return '';
          return `${day}: ${activities.map(a => 
            `${a.startTime}-${a.endTime} (${a.lectureHall})`
          ).join('; ')}`;
        })
        .filter(schedule => schedule !== '')
        .join(' | ');

      return [
        staff.name,
        staff.position,
        staff.department,
        staff.email,
        staff.phone,
        new Date(staff.joinDate).toLocaleDateString(),
        scheduleText
      ];
    });

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `search_results_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <div className="mt-4">
      {/* Statistics Section */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card border-0 h-100" style={{ 
            borderRadius: '20px',
            background: 'rgba(13, 110, 253, 0.1)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(13, 110, 253, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(13, 110, 253, 0.15)';
            e.currentTarget.style.background = 'rgba(13, 110, 253, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(13, 110, 253, 0.1)';
            e.currentTarget.style.background = 'rgba(13, 110, 253, 0.1)';
          }}>
            <div className="card-body p-4">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h6 className="text-primary mb-2" style={{ fontSize: '1rem' }}>
                    <i className="fas fa-users me-2"></i>
                    Total Staff Members
                  </h6>
                  <h2 className="text-primary mb-0" style={{ fontSize: '2.5rem', fontWeight: '600' }}>
                    {staffData.length}
                  </h2>
                  <div className="mt-3">
                    <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill">
                      <i className="fas fa-chart-line me-1"></i>
                      Active Members
                    </span>
                  </div>
                </div>
                <div className="text-end">
                  <div className="bg-primary bg-opacity-10 rounded-circle p-3 d-inline-block">
                    <i className="fas fa-users text-primary fa-3x"></i>
                  </div>
                  <div className="mt-3">
                    <small className="text-primary text-opacity-75">
                      <i className="fas fa-info-circle me-1"></i>
                      Total number of staff members in the system
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card border-0 h-100" style={{ 
            borderRadius: '20px',
            background: 'rgba(25, 135, 84, 0.1)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(25, 135, 84, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(25, 135, 84, 0.15)';
            e.currentTarget.style.background = 'rgba(25, 135, 84, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(25, 135, 84, 0.1)';
            e.currentTarget.style.background = 'rgba(25, 135, 84, 0.1)';
          }}>
            <div className="card-body p-4">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h6 className="text-success mb-2" style={{ fontSize: '1rem' }}>
                    <i className="fas fa-building me-2"></i>
                    Total Departments
                  </h6>
                  <h2 className="text-success mb-0" style={{ fontSize: '2.5rem', fontWeight: '600' }}>
                    {totalDepartments}
                  </h2>
                  <div className="mt-3">
                    <span className="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill">
                      <i className="fas fa-chart-pie me-1"></i>
                      Active Departments
                    </span>
                  </div>
                </div>
                <div className="text-end">
                  <div className="bg-success bg-opacity-10 rounded-circle p-3 d-inline-block">
                    <i className="fas fa-building text-success fa-3x"></i>
                  </div>
                  <div className="mt-3">
                    <small className="text-success text-opacity-75">
                      <i className="fas fa-info-circle me-1"></i>
                      Unique departments across the institution
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Department Distribution */}
      <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: '20px' }}>
        <div className="card-body p-4">
          <h5 className="text-primary mb-3">
            <i className="fas fa-chart-pie me-2"></i>
            Department Distribution
          </h5>
          <div className="row">
            {Object.entries(staffByDepartment).map(([department, count]) => (
              <div key={department} className="col-md-3 mb-3">
                <div className="d-flex align-items-center p-3 rounded" 
                  style={{ 
                    background: 'linear-gradient(135deg, #ffffff, #f8f9fa)',
                    border: '1px solid rgba(0,0,0,0.05)'
                  }}>
                  <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                    <i className="fas fa-building text-primary"></i>
                  </div>
                  <div>
                    <h6 className="mb-1">{department}</h6>
                    <small className="text-muted">{count} staff members</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-primary mb-0">
          <i className="fas fa-users me-2"></i>
          Staff List
        </h3>
        <div className="d-flex gap-3">
          <div className="position-relative">
            <button 
              className="btn btn-outline-primary d-flex align-items-center"
              onClick={() => setShowDownloadMenu(!showDownloadMenu)}
              disabled={isLoading || staffData.length === 0}
              style={{ 
                borderRadius: '12px',
                padding: '0.6rem 1.2rem',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                border: '1px solid rgba(13, 110, 253, 0.2)',
                background: 'rgba(13, 110, 253, 0.02)'
              }}
              onMouseEnter={(e) => {
                if (!isLoading && staffData.length > 0) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
              }}
            >
              <i className="fas fa-download me-2"></i>
              Download
              <i className={`fas fa-chevron-${showDownloadMenu ? 'up' : 'down'} ms-2`} style={{ fontSize: '0.8rem' }}></i>
            </button>
            {showDownloadMenu && (
              <div 
                className="position-absolute end-0 mt-2 animate__animated animate__fadeIn"
                style={{ 
                  zIndex: 1000,
                  animation: 'fadeIn 0.2s ease-in-out'
                }}
              >
                <div className="card border-0 shadow-lg" style={{ 
                  borderRadius: '15px',
                  minWidth: '220px',
                  background: 'rgba(255, 255, 255, 0.98)',
                  backdropFilter: 'blur(10px)'
                }}>
                  <div className="card-body p-2">
                    <div className="px-2 py-1 mb-1">
                      <small className="text-muted">Export Format</small>
                    </div>
                    <button
                      className="btn btn-link text-dark w-100 text-start p-2 d-flex align-items-center"
                      onClick={() => {
                        downloadExcel();
                        setShowDownloadMenu(false);
                      }}
                      style={{ 
                        borderRadius: '10px',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(25, 135, 84, 0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <div className="bg-success bg-opacity-10 rounded-circle p-2 me-2">
                        <i className="fas fa-file-excel text-success"></i>
                      </div>
                      <div>
                        <div>Download Excel</div>
                        <small className="text-muted">All Staff Data</small>
                      </div>
                    </button>
                    <button
                      className="btn btn-link text-dark w-100 text-start p-2 d-flex align-items-center"
                      onClick={() => {
                        downloadCSV();
                        setShowDownloadMenu(false);
                      }}
                      style={{ 
                        borderRadius: '10px',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(13, 110, 253, 0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-2">
                        <i className="fas fa-file-csv text-primary"></i>
                      </div>
                      <div>
                        <div>Download CSV</div>
                        <small className="text-muted">All Staff Data</small>
                      </div>
                    </button>
                    <button
                      className="btn btn-link text-dark w-100 text-start p-2 d-flex align-items-center"
                      onClick={() => {
                        downloadPDF();
                        setShowDownloadMenu(false);
                      }}
                      style={{ 
                        borderRadius: '10px',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(220, 53, 69, 0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <div className="bg-danger bg-opacity-10 rounded-circle p-2 me-2">
                        <i className="fas fa-file-pdf text-danger"></i>
                      </div>
                      <div>
                        <div>Download PDF</div>
                        <small className="text-muted">All Staff Data</small>
                      </div>
                    </button>
                    <div className="border-top my-2"></div>
                    <div className="px-2 py-1 mb-1">
                      <small className="text-muted">Search Results</small>
                    </div>
                    <button
                      className="btn btn-link text-dark w-100 text-start p-2 d-flex align-items-center"
                      onClick={() => {
                        downloadSearchResultsExcel();
                        setShowDownloadMenu(false);
                      }}
                      style={{ 
                        borderRadius: '10px',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(25, 135, 84, 0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <div className="bg-success bg-opacity-10 rounded-circle p-2 me-2">
                        <i className="fas fa-file-excel text-success"></i>
                      </div>
                      <div>
                        <div>Download Excel</div>
                        <small className="text-muted">Search Results</small>
                      </div>
                    </button>
                    <button
                      className="btn btn-link text-dark w-100 text-start p-2 d-flex align-items-center"
                      onClick={() => {
                        downloadSearchResultsCSV();
                        setShowDownloadMenu(false);
                      }}
                      style={{ 
                        borderRadius: '10px',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(13, 110, 253, 0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-2">
                        <i className="fas fa-file-csv text-primary"></i>
                      </div>
                      <div>
                        <div>Download CSV</div>
                        <small className="text-muted">Search Results</small>
                      </div>
                    </button>
                    <button
                      className="btn btn-link text-dark w-100 text-start p-2 d-flex align-items-center"
                      onClick={() => {
                        downloadSearchResults();
                        setShowDownloadMenu(false);
                      }}
                      style={{ 
                        borderRadius: '10px',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(220, 53, 69, 0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <div className="bg-danger bg-opacity-10 rounded-circle p-2 me-2">
                        <i className="fas fa-file-pdf text-danger"></i>
                      </div>
                      <div>
                        <div>Download PDF</div>
                        <small className="text-muted">Search Results</small>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <button 
            className="btn btn-primary d-flex align-items-center"
            onClick={onAddStaff}
            style={{ 
              borderRadius: '12px',
              padding: '0.6rem 1.2rem',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
            }}
          >
            <i className="fas fa-plus me-2"></i>
            Add New Staff
          </button>
        </div>
      </div>

      {/* Search and Sort Controls */}
      <div className="card border-0 shadow-sm mb-4" style={{ 
        borderRadius: '20px',
        background: 'linear-gradient(to right, #ffffff, #f8f9fa)',
        backdropFilter: 'blur(10px)'
      }}>
        <div className="card-body p-4">
          <div className="row g-4">
            <div className="col-md-6">
              <div className="input-group input-group-lg" style={{
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                borderRadius: '15px',
                overflow: 'hidden'
              }}>
                <span className="input-group-text bg-white border-0" style={{ padding: '0.75rem 1.25rem' }}>
                  <i className="fas fa-search text-primary"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-0 ps-0"
                  placeholder="Search staff members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  disabled={isLoading}
                  style={{ 
                    fontSize: '1rem',
                    padding: '0.75rem 1.25rem',
                    background: 'transparent'
                  }}
                />
                {searchTerm && (
                  <button
                    className="btn btn-link text-muted border-0"
                    onClick={() => setSearchTerm('')}
                    style={{ padding: '0.75rem 1.25rem' }}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex gap-3">
                <div className="flex-grow-1">
                  <select
                    className="form-select form-select-lg border-0"
                    value={sortField}
                    onChange={(e) => handleSort(e.target.value)}
                    disabled={isLoading}
                    style={{
                      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                      borderRadius: '15px',
                      padding: '0.75rem 1.25rem',
                      fontSize: '1rem',
                      background: 'white'
                    }}
                  >
                    <option value="name">Sort by Name</option>
                    <option value="position">Sort by Position</option>
                    <option value="department">Sort by Department</option>
                    <option value="joinDate">Sort by Join Date</option>
                  </select>
                </div>
                <button
                  className="btn btn-lg btn-outline-primary border-0"
                  onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                  disabled={isLoading}
                  style={{
                    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                    borderRadius: '15px',
                    padding: '0.75rem 1.25rem',
                    background: 'white',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <i className={`fas fa-sort-${sortDirection === 'asc' ? 'up' : 'down'}`}></i>
                </button>
              </div>
            </div>
          </div>
          {searchTerm && (
            <div className="mt-3 text-muted">
              <small>
                <i className="fas fa-info-circle me-1"></i>
                Showing results for "{searchTerm}"
              </small>
            </div>
          )}
        </div>
      </div>

      <div className="row">
        {isLoading ? (
          <div className="col-12 text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Loading staff data...</p>
          </div>
        ) : filteredAndSortedStaff.length > 0 ? (
          filteredAndSortedStaff.map(staff => renderStaffCard(staff))
        ) : (
          <div className="col-12">
            <div className="card border-0 shadow-sm text-center p-5" style={{ 
              borderRadius: '20px',
              background: 'linear-gradient(to right, #ffffff, #f8f9fa)'
            }}>
              <div className="mb-4">
                <i className="fas fa-search fa-3x text-muted mb-3"></i>
                <h4 className="text-muted mb-2">No Staff Members Found</h4>
                <p className="text-muted mb-0">
                  {searchTerm ? (
                    <>
                      No staff members match your search for "<strong>{searchTerm}</strong>".<br />
                      Try different keywords or clear the search to see all staff members.
                    </>
                  ) : (
                    "There are no staff members in the system yet."
                  )}
                </p>
              </div>
              {searchTerm && (
                <button
                  className="btn btn-outline-primary"
                  onClick={() => setSearchTerm('')}
                  style={{ borderRadius: '10px' }}
                >
                  <i className="fas fa-times me-2"></i>
                  Clear Search
                </button>
              )}
            </div>
          </div>
        )}
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