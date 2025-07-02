import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const HowToUse = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleDownloadManual = () => {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 48;

    // Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor('#1769ff');
    doc.text('Staff Management System - User Manual', pageWidth / 2, y, { align: 'center' });
    y += 32;

    // Section: Getting Started
    doc.setFontSize(15);
    doc.setTextColor('#1769ff');
    doc.text('Getting Started', 40, y);
    y += 18;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor('#222');
    doc.text('Registration:', 48, y);
    y += 16;
    doc.setFontSize(11);
    doc.text('1. Click "Register" on the login page', 60, y); y += 14;
    doc.text('2. Fill in your details (Name, Lecturer ID, Email, Password)', 60, y); y += 14;
    doc.text('3. Confirm your password', 60, y); y += 14;
    doc.text('4. Click "Register" to create your account', 60, y); y += 18;
    doc.setFontSize(12);
    doc.text('Login:', 48, y);
    y += 16;
    doc.setFontSize(11);
    doc.text('1. Enter your email and password', 60, y); y += 14;
    doc.text('2. Choose between Admin or Lecturer login', 60, y); y += 14;
    doc.text('3. Click "Login" to access the dashboard', 60, y); y += 14;
    doc.text('4. You will be automatically redirected to the dashboard', 60, y); y += 24;

    // Divider
    doc.setDrawColor('#e3f0ff');
    doc.setLineWidth(1);
    doc.line(40, y, pageWidth - 40, y);
    y += 24;

    // Section: Dashboard Navigation
    doc.setFontSize(15);
    doc.setTextColor('#1769ff');
    doc.text('Dashboard Navigation', 40, y);
    y += 18;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor('#222');
    doc.text('- Staff List: View, edit, or delete staff members', 60, y); y += 14;
    doc.text('- Add Staff: Add new staff members to the system', 60, y); y += 14;
    doc.text('- Help & Support: Access this guide anytime', 60, y); y += 14;

    doc.save('Staff_Management_Manual.pdf');
  };

  return (
    <div className="container-fluid py-4">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-lg border-0" style={{ borderRadius: '20px' }}>
            <div className="card-header bg-primary text-white text-center py-4" style={{ borderRadius: '20px 20px 0 0' }}>
              <h2 className="mb-0">
                <i className="fas fa-question-circle me-3"></i>
                How to Use Staff Management System
              </h2>
              <p className="mb-0 mt-2 opacity-75">Complete guide to using the application</p>
            </div>
            
            <div className="card-body p-5">
              {/* Getting Started Section */}
              <div className="mb-5">
                <h3 className="text-primary mb-4">
                  <i className="fas fa-rocket me-2"></i>
                  Getting Started
                </h3>
                <div className="row">
                  <div className="col-md-6">
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="card-body">
                        <h5 className="card-title text-primary">
                          <i className="fas fa-user-plus me-2"></i>
                          Registration
                        </h5>
                        <ol className="list-unstyled">
                          <li className="mb-2">
                            <span className="badge bg-primary me-2">1</span>
                            Click "Register" on the login page
                          </li>
                          <li className="mb-2">
                            <span className="badge bg-primary me-2">2</span>
                            Fill in your details (Name, Lecturer ID, Email, Password)
                          </li>
                          <li className="mb-2">
                            <span className="badge bg-primary me-2">3</span>
                            Confirm your password
                          </li>
                          <li className="mb-2">
                            <span className="badge bg-primary me-2">4</span>
                            Click "Register" to create your account
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="card-body">
                        <h5 className="card-title text-primary">
                          <i className="fas fa-sign-in-alt me-2"></i>
                          Login
                        </h5>
                        <ol className="list-unstyled">
                          <li className="mb-2">
                            <span className="badge bg-success me-2">1</span>
                            Enter your email and password
                          </li>
                          <li className="mb-2">
                            <span className="badge bg-success me-2">2</span>
                            Choose between Admin or Lecturer login
                          </li>
                          <li className="mb-2">
                            <span className="badge bg-success me-2">3</span>
                            Click "Login" to access the dashboard
                          </li>
                          <li className="mb-2">
                            <span className="badge bg-success me-2">4</span>
                            You'll be automatically redirected to the dashboard
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dashboard Navigation Section */}
              <div className="mb-5">
                <h3 className="text-primary mb-4">
                  <i className="fas fa-compass me-2"></i>
                  Dashboard Navigation
                </h3>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <div className="card border-0 shadow-sm h-100">
                      <div className="card-body text-center">
                        <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                          <i className="fas fa-users fa-2x text-primary"></i>
                        </div>
                        <h5 className="card-title">Staff List</h5>
                        <p className="card-text text-muted">
                          View all registered staff members, their details, and manage their information.
                        </p>
                        <div className="mt-3">
                          <span className="badge bg-info">View</span>
                          <span className="badge bg-warning ms-1">Edit</span>
                          <span className="badge bg-danger ms-1">Delete</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="card border-0 shadow-sm h-100">
                      <div className="card-body text-center">
                        <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                          <i className="fas fa-user-plus fa-2x text-success"></i>
                        </div>
                        <h5 className="card-title">Add Staff</h5>
                        <p className="card-text text-muted">
                          Add new staff members to the system with their complete information.
                        </p>
                        <div className="mt-3">
                          <span className="badge bg-success">Create</span>
                          <span className="badge bg-primary ms-1">Upload</span>
                          <span className="badge bg-info ms-1">Validate</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="card border-0 shadow-sm h-100">
                      <div className="card-body text-center">
                        <div className="bg-warning bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                          <i className="fas fa-question-circle fa-2x text-warning"></i>
                        </div>
                        <h5 className="card-title">Help & Support</h5>
                        <p className="card-text text-muted">
                          Access this guide anytime to learn how to use the system effectively.
                        </p>
                        <div className="mt-3">
                          <span className="badge bg-warning">Guide</span>
                          <span className="badge bg-info ms-1">Support</span>
                          <span className="badge bg-secondary ms-1">FAQ</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features Section */}
              <div className="mb-5">
                <h3 className="text-primary mb-4">
                  <i className="fas fa-star me-2"></i>
                  Key Features
                </h3>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="feature-item mb-4">
                      <div className="d-flex align-items-start">
                        <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px', minWidth: '40px' }}>
                          <i className="fas fa-search text-primary"></i>
                        </div>
                        <div>
                          <h6 className="mb-2">Search & Filter</h6>
                          <p className="text-muted mb-0">
                            Quickly find staff members using the search bar. Filter by name, email, or department.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="feature-item mb-4">
                      <div className="d-flex align-items-start">
                        <div className="bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px', minWidth: '40px' }}>
                          <i className="fas fa-edit text-success"></i>
                        </div>
                        <div>
                          <h6 className="mb-2">Edit Information</h6>
                          <p className="text-muted mb-0">
                            Update staff details easily. Click the edit button to modify any information.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="feature-item mb-4">
                      <div className="d-flex align-items-start">
                        <div className="bg-danger bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px', minWidth: '40px' }}>
                          <i className="fas fa-trash text-danger"></i>
                        </div>
                        <div>
                          <h6 className="mb-2">Delete Staff</h6>
                          <p className="text-muted mb-0">
                            Remove staff members from the system. Confirmation dialog prevents accidental deletions.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="feature-item mb-4">
                      <div className="d-flex align-items-start">
                        <div className="bg-info bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px', minWidth: '40px' }}>
                          <i className="fas fa-download text-info"></i>
                        </div>
                        <div>
                          <h6 className="mb-2">Export Data</h6>
                          <p className="text-muted mb-0">
                            Export staff data to PDF or Excel format for reporting and analysis.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step-by-Step Instructions */}
              <div className="mb-5">
                <h3 className="text-primary mb-4">
                  <i className="fas fa-list-ol me-2"></i>
                  Step-by-Step Instructions
                </h3>
                <div className="accordion" id="instructionsAccordion">
                  <div className="accordion-item border-0 shadow-sm mb-3">
                    <h2 className="accordion-header">
                      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                        <i className="fas fa-user-plus me-2 text-primary"></i>
                        Adding a New Staff Member
                      </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#instructionsAccordion">
                      <div className="accordion-body">
                        <ol>
                          <li>Click on "Add Staff" in the navigation bar</li>
                          <li>Fill in all required fields (Name, Email, Department, etc.)</li>
                          <li>Upload a profile photo (optional)</li>
                          <li>Click "Add Staff" to save the information</li>
                          <li>You'll see a success message and be redirected to the staff list</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                  
                  <div className="accordion-item border-0 shadow-sm mb-3">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                        <i className="fas fa-edit me-2 text-warning"></i>
                        Editing Staff Information
                      </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#instructionsAccordion">
                      <div className="accordion-body">
                        <ol>
                          <li>Go to the "Staff" page to view all staff members</li>
                          <li>Find the staff member you want to edit</li>
                          <li>Click the "Edit" button (pencil icon)</li>
                          <li>Modify the information in the form</li>
                          <li>Click "Update" to save changes</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                  
                  <div className="accordion-item border-0 shadow-sm mb-3">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree">
                        <i className="fas fa-search me-2 text-info"></i>
                        Searching for Staff Members
                      </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#instructionsAccordion">
                      <div className="accordion-body">
                        <ol>
                          <li>Navigate to the "Staff" page</li>
                          <li>Use the search bar at the top of the page</li>
                          <li>Type the name, email, or department you're looking for</li>
                          <li>Results will filter automatically as you type</li>
                          <li>Clear the search to see all staff members again</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tips & Best Practices */}
              <div className="mb-5">
                <h3 className="text-primary mb-4">
                  <i className="fas fa-lightbulb me-2"></i>
                  Tips & Best Practices
                </h3>
                <div className="row">
                  <div className="col-md-6">
                    <div className="alert alert-info border-0 shadow-sm">
                      <h6 className="alert-heading">
                        <i className="fas fa-info-circle me-2"></i>
                        Data Management
                      </h6>
                      <ul className="mb-0">
                        <li>Always verify information before saving</li>
                        <li>Use consistent naming conventions</li>
                        <li>Keep email addresses unique</li>
                        <li>Regularly backup important data</li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="alert alert-success border-0 shadow-sm">
                      <h6 className="alert-heading">
                        <i className="fas fa-shield-alt me-2"></i>
                        Security
                      </h6>
                      <ul className="mb-0">
                        <li>Use strong passwords</li>
                        <li>Log out when finished</li>
                        <li>Don't share your login credentials</li>
                        <li>Report any suspicious activity</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Support Section */}
              <div className="text-center">
                <div className="bg-light rounded-3 p-4">
                  <h4 className="text-primary mb-3">
                    <i className="fas fa-headset me-2"></i>
                    Need More Help?
                  </h4>
                  <p className="text-muted mb-3">
                    If you need additional assistance or have questions about the system, please contact your system administrator.
                  </p>
                  <div className="d-flex justify-content-center gap-3">
                    <button className="btn btn-primary" onClick={handleShowModal}>
                      <i className="fas fa-envelope me-2"></i>
                      Contact Support
                    </button>
                    <button className="btn btn-outline-primary" onClick={handleDownloadManual}>
                      <i className="fas fa-file-pdf me-2"></i>
                      Download Manual
                    </button>
                  </div>
                </div>
              </div>
              {/* Modal for Contact Info */}
              {showModal && (
                <div className="glass-modal-backdrop" tabIndex="-1" role="dialog">
                  <div className="glass-modal-dialog" role="document">
                    <div className="glass-modal-content">
                      <div className="glass-modal-header">
                        <div className="glass-modal-title-wrap">
                          <span className="glass-modal-title-icon">
                            <i className="fas fa-user-circle"></i>
                          </span>
                          <span className="glass-modal-title">Contact Information</span>
                        </div>
                        <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={handleCloseModal}></button>
                      </div>
                      <div className="glass-modal-body text-center">
                        <div className="glass-photo-wrap">
                          <img src="/images/chamika.jpg" alt="Chamika Shashipriya" className="glass-contact-photo" />
                        </div>
                        <div className="glass-contact-card mt-3 mx-auto">
                          <p className="mb-1 fw-bold fs-5 glass-contact-name">Chamika Shashipriya</p>
                          <p className="mb-2 glass-contact-whatsapp">
                            <i className="fab fa-whatsapp text-success me-2"></i>
                            Whatsapp: <a href="https://wa.me/94704120358" target="_blank" rel="noopener noreferrer">+94 70 412 0358</a>
                          </p>
                        </div>
                      </div>
                      <div className="glass-modal-footer justify-content-center">
                        <button type="button" className="btn glass-btn-pill" onClick={handleCloseModal}>Close</button>
                      </div>
                    </div>
                  </div>
                  <style>{`
                    .glass-modal-backdrop {
                      position: fixed;
                      top: 0; left: 0; right: 0; bottom: 0;
                      background: rgba(30, 58, 138, 0.18);
                      z-index: 1050;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      animation: fadeIn 0.3s;
                      backdrop-filter: blur(6px);
                    }
                    .glass-modal-dialog {
                      max-width: 410px;
                      width: 100%;
                      margin: 0 auto;
                      animation: scaleIn 0.3s;
                    }
                    .glass-modal-content {
                      background: rgba(255,255,255,0.55);
                      border-radius: 28px;
                      box-shadow: 0 8px 40px rgba(30,58,138,0.18);
                      border: 1.5px solid rgba(30,58,138,0.10);
                      overflow: hidden;
                      position: relative;
                      backdrop-filter: blur(16px);
                    }
                    .glass-modal-header {
                      background: none;
                      border-bottom: none;
                      padding: 1.5rem 1.5rem 1rem 1.5rem;
                      display: flex;
                      align-items: center;
                      justify-content: space-between;
                      border-top-left-radius: 28px;
                      border-top-right-radius: 28px;
                      border-bottom: 2px solid #e3f0ff;
                    }
                    .glass-modal-title-wrap {
                      display: flex;
                      align-items: center;
                      gap: 0.7rem;
                    }
                    .glass-modal-title-icon {
                      font-size: 2.1rem;
                      color: #1769ff;
                      background: linear-gradient(135deg, #e3f0ff 60%, #b3e5fc 100%);
                      border-radius: 50%;
                      padding: 0.2em 0.3em;
                      box-shadow: 0 2px 8px rgba(30,58,138,0.10);
                      border: 2px solid #b3e5fc;
                    }
                    .glass-modal-title {
                      font-size: 1.25rem;
                      font-weight: 700;
                      color: #1769ff;
                      letter-spacing: 0.5px;
                    }
                    .glass-modal-body {
                      padding: 2.2rem 1.5rem 1.5rem 1.5rem;
                    }
                    .glass-photo-wrap {
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      margin-top: -70px;
                      margin-bottom: 0.5rem;
                    }
                    .glass-contact-photo {
                      width: 160px;
                      height: 160px;
                      object-fit: cover;
                      border-radius: 24px;
                      border: 5px solid #fff;
                      box-shadow: 0 0 0 8px #b3e5fc, 0 12px 40px rgba(30,58,138,0.12);
                      transition: transform 0.25s, box-shadow 0.25s;
                      background: #e3f0ff;
                    }
                    .glass-contact-photo:hover {
                      transform: scale(1.08) rotate(-2deg);
                      box-shadow: 0 0 0 12px #b3e5fc, 0 16px 48px rgba(30,58,138,0.18);
                    }
                    .glass-contact-card {
                      background: rgba(255,255,255,0.85);
                      border-radius: 18px;
                      box-shadow: 0 2px 12px rgba(30,58,138,0.06);
                      padding: 1.2rem 1rem 0.7rem 1rem;
                      max-width: 320px;
                    }
                    .glass-contact-name {
                      font-size: 1.18rem;
                      color: #1769ff;
                      letter-spacing: 0.5px;
                    }
                    .glass-contact-whatsapp a {
                      color: #25d366;
                      font-weight: 500;
                      text-decoration: none;
                    }
                    .glass-contact-whatsapp a:hover {
                      text-decoration: underline;
                    }
                    .glass-modal-footer {
                      background: none;
                      border-top: none;
                      padding: 1.2rem 1.5rem 1.7rem 1.5rem;
                      display: flex;
                      justify-content: center;
                    }
                    .glass-btn-pill {
                      border-radius: 999px;
                      padding: 0.6rem 2.2rem;
                      font-weight: 600;
                      background: linear-gradient(90deg, #1769ff 60%, #4fc3f7 100%);
                      color: #fff;
                      border: none;
                      box-shadow: 0 2px 12px rgba(30,58,138,0.10);
                      transition: background 0.2s, color 0.2s, box-shadow 0.2s;
                    }
                    .glass-btn-pill:hover {
                      background: linear-gradient(90deg, #4fc3f7 60%, #1769ff 100%);
                      color: #fff;
                      box-shadow: 0 4px 24px rgba(30,58,138,0.18);
                    }
                    @keyframes fadeIn {
                      from { opacity: 0; }
                      to { opacity: 1; }
                    }
                    @keyframes scaleIn {
                      from { transform: scale(0.85); }
                      to { transform: scale(1); }
                    }
                  `}</style>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToUse; 