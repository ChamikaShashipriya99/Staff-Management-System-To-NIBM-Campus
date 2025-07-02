import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const LecturerLogin = ({ onLogin, onShowRegister, onShowAdminLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth?lecturer/login`, formData);
      if (response.data.success) {
        setIsLoginSuccess(true);
        setTimeout(() => {
          localStorage.setItem('isAuthenticated', 'true');
          onLogin();
        }, 3500);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid email or password');
      setIsLoading(false);
    }
  };

  if (isLoginSuccess) {
    return (
      <div 
        className="min-vh-100 d-flex align-items-center justify-content-center"
        style={{
          background: 'linear-gradient(135deg, rgba(13, 110, 253, 0.95) 0%, rgba(13, 110, 253, 0.85) 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Success Animation Container */}
        <div className="text-center" style={{ position: 'relative', zIndex: 2 }}>
          <div className="success-animation">
            <div className="success-checkmark">
              <div className="check-icon">
                <span className="icon-line line-tip"></span>
                <span className="icon-line line-long"></span>
                <div className="icon-circle"></div>
                <div className="icon-fix"></div>
              </div>
            </div>
            <div className="success-rings">
              <div className="ring ring-1"></div>
              <div className="ring ring-2"></div>
              <div className="ring ring-3"></div>
            </div>
            <div className="success-particles">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="particle" style={{ '--i': i }}></div>
              ))}
            </div>
          </div>
          <h3 className="text-white mt-4 mb-2 success-title">Login Successful!</h3>
          <p className="text-white-50 success-subtitle">Redirecting to dashboard...</p>
        </div>
        <style>{`/* Success animation styles copied from Login.js */`}</style>
      </div>
    );
  }

  return (
    <div 
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: 'linear-gradient(135deg, rgba(13, 110, 253, 0.95) 0%, rgba(13, 110, 253, 0.85) 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* 3D Animated background elements */}
      <div className="position-absolute w-100 h-100" style={{ zIndex: 0 }}>
        <div className="position-absolute" style={{
          top: '10%', left: '10%', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.1)', animation: 'float 6s ease-in-out infinite'
        }}></div>
        <div className="position-absolute" style={{
          bottom: '10%', right: '10%', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.1)', animation: 'float 8s ease-in-out infinite'
        }}></div>
        <div className="position-absolute" style={{
          top: '20%', right: '15%', width: '150px', height: '150px', background: 'rgba(255, 255, 255, 0.05)', transform: 'rotate(45deg)', animation: 'rotate 20s linear infinite'
        }}></div>
        <div className="position-absolute" style={{
          bottom: '20%', left: '15%', width: '100px', height: '100px', background: 'rgba(255, 255, 255, 0.05)', transform: 'rotate(45deg)', animation: 'rotate 15s linear infinite reverse'
        }}></div>
        <div className="position-absolute" style={{
          top: '30%', left: '30%', width: '200px', height: '2px', background: 'rgba(255, 255, 255, 0.1)', animation: 'slideRight 8s ease-in-out infinite'
        }}></div>
        <div className="position-absolute" style={{
          bottom: '30%', right: '30%', width: '200px', height: '2px', background: 'rgba(255, 255, 255, 0.1)', animation: 'slideLeft 8s ease-in-out infinite'
        }}></div>
        <div className="position-absolute" style={{
          top: '40%', left: '40%', width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.2)', animation: 'moveDot 10s ease-in-out infinite'
        }}></div>
        <div className="position-absolute" style={{
          top: '60%', right: '40%', width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.2)', animation: 'moveDot 12s ease-in-out infinite reverse'
        }}></div>
        <div className="position-absolute w-100" style={{
          bottom: '0', height: '100px', background: 'linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.1))', animation: 'wave 8s ease-in-out infinite'
        }}></div>
        <div className="position-absolute" style={{
          top: '15%', right: '25%', width: '50px', height: '50px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)', animation: 'glow 4s ease-in-out infinite'
        }}></div>
        <div className="position-absolute" style={{
          bottom: '25%', left: '20%', width: '40px', height: '40px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)', animation: 'glow 5s ease-in-out infinite reverse'
        }}></div>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="position-absolute"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              background: 'rgba(255, 255, 255, 0.3)',
              borderRadius: '50%',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `particle ${Math.random() * 10 + 5}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
        <div className="position-absolute" style={{
          top: '45%', right: '35%', width: '0', height: '0', borderLeft: '20px solid transparent', borderRight: '20px solid transparent', borderBottom: '35px solid rgba(255, 255, 255, 0.1)', animation: 'rotate3D 15s linear infinite'
        }}></div>
        <div className="position-absolute" style={{
          bottom: '35%', left: '35%', width: '0', height: '0', borderLeft: '15px solid transparent', borderRight: '15px solid transparent', borderBottom: '25px solid rgba(255, 255, 255, 0.1)', animation: 'rotate3D 12s linear infinite reverse'
        }}></div>
        <div className="position-absolute" style={{
          top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '300px', height: '300px', border: '2px solid rgba(255, 255, 255, 0.1)', borderRadius: '50%', animation: 'expand 8s ease-in-out infinite'
        }}></div>
        <div className="position-absolute" style={{
          top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '200px', height: '200px', border: '2px solid rgba(255, 255, 255, 0.1)', borderRadius: '50%', animation: 'expand 8s ease-in-out infinite 1s'
        }}></div>
      </div>
      {/* Login Card */}
      <div 
        className="card border-0" 
        style={{ 
          width: '100%',
          maxWidth: '400px',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          boxShadow: '0 15px 35px rgba(13, 110, 253, 0.2)',
          position: 'relative',
          zIndex: 1,
          transform: 'translateY(0)',
          transition: 'all 0.3s ease',
          animation: 'slideUp 0.5s ease-out',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}
      >
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <div 
              className="bg-primary bg-opacity-10 rounded-circle p-3 d-inline-block mb-3"
              style={{
                animation: 'pulse 2s infinite'
              }}
            >
              <i className="fas fa-user-lock text-primary fa-2x"></i>
            </div>
            <h3 className="text-primary mb-1 fw-bold">Lecturer Login</h3>
            <p className="text-muted">Please login to your lecturer account</p>
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
                    borderRadius: '12px',
                    border: '2px solid #e9ecef',
                    transition: 'all 0.3s ease',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)'
                  }}
                />
                <label htmlFor="email" className="text-muted">
                  <i className="fas fa-envelope me-2"></i>
                  Email
                </label>
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
                    borderRadius: '12px',
                    border: '2px solid #e9ecef',
                    transition: 'all 0.3s ease',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)'
                  }}
                />
                <label htmlFor="password" className="text-muted">
                  <i className="fas fa-lock me-2"></i>
                  Password
                </label>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary w-100 py-3"
              disabled={isLoading}
              style={{ 
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(13, 110, 253, 0.1)',
                background: 'linear-gradient(45deg, rgba(13, 110, 253, 0.9), rgba(13, 110, 253, 0.8))',
                border: 'none',
                fontWeight: '600',
                letterSpacing: '0.5px'
              }}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <div className="mt-3 text-center">
            <span>Don't have an account? </span>
            <button type="button" className="btn btn-link p-0 align-baseline" onClick={onShowRegister} style={{textDecoration: 'underline'}}>Register</button>
          </div>
          <div className="mt-3 text-center">
            <span>Are you an admin? </span>
            <button type="button" className="btn btn-link p-0 align-baseline" onClick={onShowAdminLogin} style={{textDecoration: 'underline'}}>Admin Login</button>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes slideRight {
          0%, 100% { left: 30%; }
          50% { left: 60%; }
        }
        @keyframes slideLeft {
          0%, 100% { right: 30%; }
          50% { right: 60%; }
        }
        @keyframes moveDot {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.5); }
        }
        @keyframes wave {
          0%, 100% { height: 100px; }
          50% { height: 120px; }
        }
        @keyframes glow {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        @keyframes particle {
          0% { opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes rotate3D {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
        @keyframes expand {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.1); }
        }
      `}</style>
    </div>
  );
};

export default LecturerLogin; 