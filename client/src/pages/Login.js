import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Check credentials
    if (formData.email === 'admin@gmail.com' && formData.password === 'Admin123#') {
      // Store authentication state
      localStorage.setItem('isAuthenticated', 'true');
      onLogin();
    } else {
      toast.error('Invalid email or password');
    }
    
    setIsLoading(false);
  };

  return (
    <div 
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative'
      }}
    >
      {/* Overlay */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(5px)'
        }}
      ></div>

      {/* Login Card */}
      <div 
        className="card border-0 shadow-lg" 
        style={{ 
          borderRadius: '20px',
          width: '100%',
          maxWidth: '400px',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          position: 'relative',
          zIndex: 1
        }}
      >
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <div className="bg-primary bg-opacity-10 rounded-circle p-3 d-inline-block mb-3">
              <i className="fas fa-user-lock text-primary fa-2x"></i>
            </div>
            <h3 className="text-primary mb-1">Welcome Back</h3>
            <p className="text-muted">Please login to your account</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
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
                  style={{ 
                    borderRadius: '10px',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)'
                  }}
                />
                <label htmlFor="email">Email</label>
              </div>
            </div>

            <div className="mb-4">
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  required
                  style={{ 
                    borderRadius: '10px',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)'
                  }}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary w-100 py-3"
              disabled={isLoading}
              style={{ 
                borderRadius: '10px',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
              }}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Logging in...
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt me-2"></i>
                  Login
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login; 