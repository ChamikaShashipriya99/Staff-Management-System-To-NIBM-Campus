import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddStaff from './pages/AddStaff';
import StaffList from './pages/StaffList';
import Login from './pages/Login';
import Register from './pages/Register';
import LecturerLogin from './pages/LecturerLogin';
import HowToUse from './pages/HowToUse';
import RegisteredUsers from './pages/RegisteredUsers';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Link } from 'react-router-dom';

function App() {
  const [currentPage, setCurrentPage] = useState('staff');
  const [staffData, setStaffData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [logoError, setLogoError] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLecturerLogin, setShowLecturerLogin] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const auth = localStorage.getItem('isAuthenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
      fetchStaff();
    } else {
      setCurrentPage('login');
      setIsLoading(false);
    }
  }, []);

  const fetchStaff = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/staff');
      setStaffData(response.data);
    } catch (error) {
      console.error('Error fetching staff:', error);
      toast.error('Failed to fetch staff data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogoError = () => {
    setLogoError(true);
  };

  const handleAddStaff = () => {
    setCurrentPage('addStaff');
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    setCurrentPage('login');
    setStaffData([]);
    toast.info('Logged out successfully');
  };

  const handleLogin = () => {
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
    setCurrentPage('staff');
    fetchStaff();
    toast.success('Welcome back!');
  };

  const handleRegister = () => {
    setShowRegister(false);
    setCurrentPage('login');
    toast.success('Registration successful! Please log in.');
  };

  const renderPage = () => {
    if (!isAuthenticated) {
      if (showRegister) {
        return <Register onRegister={handleRegister} onShowLogin={() => setShowRegister(false)} />;
      }
      if (showLecturerLogin) {
        return <LecturerLogin onLogin={handleLogin} onShowRegister={() => setShowRegister(true)} onShowAdminLogin={() => setShowLecturerLogin(false)} />;
      }
      return <Login onLogin={handleLogin} onShowRegister={() => setShowRegister(true)} onShowLecturerLogin={() => setShowLecturerLogin(true)} />;
    }

    switch (currentPage) {
      case 'addStaff':
        return <AddStaff onSuccess={() => {
          fetchStaff();
          setCurrentPage('staff');
          toast.success('Staff member added successfully!');
        }} />;
      case 'staff':
        return (
          <StaffList 
            onAddStaff={handleAddStaff} 
            staffData={staffData}
            onStaffUpdate={fetchStaff}
            isLoading={isLoading}
          />
        );
      case 'registeredUsers':
        return <RegisteredUsers />;
      case 'howToUse':
        return <HowToUse />;
      default:
        return (
          <StaffList 
            onAddStaff={handleAddStaff} 
            staffData={staffData}
            onStaffUpdate={fetchStaff}
            isLoading={isLoading}
          />
        );
    }
  };

  return (
    <div className="min-vh-100 bg-light">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      
      {isAuthenticated && (
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top shadow-lg" 
          style={{ 
            borderRadius: '20px',
            margin: '0 20px',
            padding: '15px 30px',
            backgroundColor: 'rgba(13, 110, 253, 0.65)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            top: '10px',
            transition: 'all 0.3s ease',
            boxShadow: '0 8px 32px rgba(13, 110, 253, 0.2)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(13, 110, 253, 0.75)';
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(13, 110, 253, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(13, 110, 253, 0.65)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(13, 110, 253, 0.2)';
          }}>
          <div className="container-fluid">
            <Link className="navbar-brand d-flex align-items-center" to="/" style={{
              transition: 'all 0.3s ease',
              transform: 'translateY(0)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}>
              {!logoError ? (
                <img 
                  src="/images/cinec-logo.png"
                  alt="CINEC Logo" 
                  style={{ 
                    height: '40px', 
                    marginRight: '15px',
                    transition: 'all 0.3s ease',
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                  }}
                  onError={handleLogoError}
                />
              ) : (
                <div className="d-flex align-items-center">
                  <i className="fas fa-university fa-2x me-2"></i>
                  <span className="fw-bold">NIBM Campus</span>
                </div>
              )}
            </Link>
            
            <div className="d-flex align-items-center">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <button 
                    className={`nav-link btn btn-link ${currentPage === 'addStaff' ? 'active' : ''}`} 
                    onClick={() => setCurrentPage('addStaff')}
                    style={{ 
                      textDecoration: 'none',
                      color: 'rgba(255, 255, 255, 0.9)',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      padding: '8px 16px',
                      borderRadius: '10px',
                      margin: '0 5px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#ffffff';
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <i className="fas fa-user-plus me-2"></i>
                    Add Staff
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link btn btn-link ${currentPage === 'staff' ? 'active' : ''}`} 
                    onClick={() => setCurrentPage('staff')}
                    style={{ 
                      textDecoration: 'none',
                      color: 'rgba(255, 255, 255, 0.9)',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      padding: '8px 16px',
                      borderRadius: '10px',
                      margin: '0 5px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#ffffff';
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <i className="fas fa-users me-2"></i>
                    Staff
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link btn btn-link ${currentPage === 'registeredUsers' ? 'active' : ''}`} 
                    onClick={() => setCurrentPage('registeredUsers')}
                    style={{ 
                      textDecoration: 'none',
                      color: 'rgba(255, 255, 255, 0.9)',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      padding: '8px 16px',
                      borderRadius: '10px',
                      margin: '0 5px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#ffffff';
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <i className="fas fa-id-card me-2"></i>
                    Registered Users
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link btn btn-link ${currentPage === 'howToUse' ? 'active' : ''}`} 
                    onClick={() => setCurrentPage('howToUse')}
                    style={{ 
                      textDecoration: 'none',
                      color: 'rgba(255, 255, 255, 0.9)',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      padding: '8px 16px',
                      borderRadius: '10px',
                      margin: '0 5px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#ffffff';
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <i className="fas fa-question-circle me-2"></i>
                    How to Use
                  </button>
                </li>
              </ul>
              <button 
                className="btn btn-outline-light ms-3" 
                onClick={handleLogout}
                style={{ 
                  borderRadius: '10px',
                  padding: '8px 20px',
                  transition: 'all 0.3s ease',
                  borderWidth: '2px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <i className="fas fa-sign-out-alt me-2"></i>
                Logout
              </button>
            </div>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <div className="container-fluid" style={{ paddingTop: isAuthenticated ? '100px' : '0' }}>
        <div className="row">
          <div className="col-12">
            {renderPage()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;