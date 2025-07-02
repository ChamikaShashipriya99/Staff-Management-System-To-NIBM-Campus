import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const Login = ({ onLogin, onShowRegister, onShowLecturerLogin }) => {
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
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, formData);
      
      if (response.data.success) {
        // Show success animation
        setIsLoginSuccess(true);
        
        // Store authentication state and redirect after animation
        setTimeout(() => {
      localStorage.setItem('isAuthenticated', 'true');
      onLogin();
        }, 3500); // Wait for 3.5 seconds to show the animation
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

        <style>
          {`
            .success-animation {
              position: relative;
              width: 120px;
              height: 120px;
              margin: 0 auto;
            }

            .success-checkmark {
              width: 80px;
              height: 80px;
              margin: 0 auto;
              position: relative;
              z-index: 2;
            }

            .success-checkmark .check-icon {
              width: 80px;
              height: 80px;
              position: relative;
              border-radius: 50%;
              box-sizing: content-box;
              border: 4px solid #4CAF50;
              animation: scaleIn 0.5s ease-out;
            }

            .success-checkmark .check-icon::before {
              top: 3px;
              left: -2px;
              width: 30px;
              transform-origin: 100% 50%;
              border-radius: 100px 0 0 100px;
            }

            .success-checkmark .check-icon::after {
              top: 0;
              left: 30px;
              width: 60px;
              transform-origin: 0 50%;
              border-radius: 0 100px 100px 0;
              animation: rotate-circle 4.25s ease-in;
            }

            .success-checkmark .check-icon::before, .success-checkmark .check-icon::after {
              content: '';
              height: 100px;
              position: absolute;
              background: #FFFFFF;
              transform: rotate(-45deg);
            }

            .success-checkmark .check-icon .icon-line {
              height: 5px;
              background-color: #4CAF50;
              display: block;
              border-radius: 2px;
              position: absolute;
              z-index: 10;
              animation: line-draw 0.75s ease-out forwards;
            }

            .success-checkmark .check-icon .icon-line.line-tip {
              top: 46px;
              left: 14px;
              width: 25px;
              transform: rotate(45deg);
              animation: icon-line-tip 0.75s;
            }

            .success-checkmark .check-icon .icon-line.line-long {
              top: 38px;
              right: 8px;
              width: 47px;
              transform: rotate(-45deg);
              animation: icon-line-long 0.75s;
            }

            .success-checkmark .check-icon .icon-circle {
              top: -4px;
              left: -4px;
              z-index: 10;
              width: 80px;
              height: 80px;
              border-radius: 50%;
              position: absolute;
              box-sizing: content-box;
              border: 4px solid rgba(76, 175, 80, .5);
              animation: circle-draw 0.75s ease-out forwards;
            }

            .success-checkmark .check-icon .icon-fix {
              top: 8px;
              width: 5px;
              left: 26px;
              z-index: 1;
              height: 85px;
              position: absolute;
              transform: rotate(-45deg);
              background-color: #FFFFFF;
            }

            .success-rings {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 100%;
              height: 100%;
            }

            .ring {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              border: 2px solid rgba(255, 255, 255, 0.3);
              border-radius: 50%;
              animation: ring-expand 1.5s ease-out infinite;
            }

            .ring-1 { width: 100%; height: 100%; animation-delay: 0s; }
            .ring-2 { width: 120%; height: 120%; animation-delay: 0.2s; }
            .ring-3 { width: 140%; height: 140%; animation-delay: 0.4s; }

            .success-particles {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 100%;
              height: 100%;
            }

            .particle {
              position: absolute;
              width: 6px;
              height: 6px;
              background: rgba(255, 255, 255, 0.5);
              border-radius: 50%;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              animation: particle-move 1.5s ease-out infinite;
              animation-delay: calc(var(--i) * 0.1s);
            }

            .success-title {
              animation: slideUp 0.5s ease-out 0.5s both;
            }

            .success-subtitle {
              animation: slideUp 0.5s ease-out 0.7s both;
            }

            @keyframes scaleIn {
              from { transform: scale(0); }
              to { transform: scale(1); }
            }

            @keyframes circle-draw {
              from { stroke-dashoffset: 283; }
              to { stroke-dashoffset: 0; }
            }

            @keyframes line-draw {
              from { width: 0; }
              to { width: 100%; }
            }

            @keyframes ring-expand {
              0% { 
                transform: translate(-50%, -50%) scale(0.8);
                opacity: 0;
              }
              50% { 
                transform: translate(-50%, -50%) scale(1.2);
                opacity: 0.5;
              }
              100% { 
                transform: translate(-50%, -50%) scale(0.8);
                opacity: 0;
              }
            }

            @keyframes particle-move {
              0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 0;
              }
              50% {
                transform: translate(-50%, -50%) scale(1) translate(
                  calc(cos(var(--i) * 30deg) * 50px),
                  calc(sin(var(--i) * 30deg) * 50px)
                );
                opacity: 1;
              }
              100% {
                transform: translate(-50%, -50%) scale(0) translate(
                  calc(cos(var(--i) * 30deg) * 100px),
                  calc(sin(var(--i) * 30deg) * 100px)
                );
                opacity: 0;
              }
            }

            @keyframes slideUp {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            @keyframes rotate-circle {
              0% { transform: rotate(-45deg); }
              5% { transform: rotate(-45deg); }
              12% { transform: rotate(-405deg); }
              100% { transform: rotate(-405deg); }
            }

            @keyframes icon-line-tip {
              0% { width: 0; left: 1px; top: 19px; }
              54% { width: 0; left: 1px; top: 19px; }
              70% { width: 50px; left: -8px; top: 37px; }
              84% { width: 17px; left: 21px; top: 48px; }
              100% { width: 25px; left: 14px; top: 46px; }
            }

            @keyframes icon-line-long {
              0% { width: 0; right: 46px; top: 54px; }
              65% { width: 0; right: 46px; top: 54px; }
              84% { width: 55px; right: 0px; top: 35px; }
              100% { width: 47px; right: 8px; top: 38px; }
            }
          `}
        </style>
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
      {/* Animated background elements */}
      <div className="position-absolute w-100 h-100" style={{ zIndex: 0 }}>
        {/* Floating circles */}
        <div className="position-absolute" style={{
          top: '10%',
          left: '10%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          animation: 'float 6s ease-in-out infinite'
        }}></div>
        <div className="position-absolute" style={{
          bottom: '10%',
          right: '10%',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          animation: 'float 8s ease-in-out infinite'
        }}></div>

        {/* Animated squares */}
        <div className="position-absolute" style={{
          top: '20%',
          right: '15%',
          width: '150px',
          height: '150px',
          background: 'rgba(255, 255, 255, 0.05)',
          transform: 'rotate(45deg)',
          animation: 'rotate 20s linear infinite'
        }}></div>
        <div className="position-absolute" style={{
          bottom: '20%',
          left: '15%',
          width: '100px',
          height: '100px',
          background: 'rgba(255, 255, 255, 0.05)',
          transform: 'rotate(45deg)',
          animation: 'rotate 15s linear infinite reverse'
        }}></div>

        {/* Animated lines */}
        <div className="position-absolute" style={{
          top: '30%',
          left: '30%',
          width: '200px',
          height: '2px',
          background: 'rgba(255, 255, 255, 0.1)',
          animation: 'slideRight 8s ease-in-out infinite'
        }}></div>
        <div className="position-absolute" style={{
          bottom: '30%',
          right: '30%',
          width: '200px',
          height: '2px',
          background: 'rgba(255, 255, 255, 0.1)',
          animation: 'slideLeft 8s ease-in-out infinite'
        }}></div>

        {/* Animated dots */}
        <div className="position-absolute" style={{
          top: '40%',
          left: '40%',
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.2)',
          animation: 'moveDot 10s ease-in-out infinite'
        }}></div>
        <div className="position-absolute" style={{
          top: '60%',
          right: '40%',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.2)',
          animation: 'moveDot 12s ease-in-out infinite reverse'
        }}></div>

        {/* Animated waves */}
        <div className="position-absolute w-100" style={{
          bottom: '0',
          height: '100px',
          background: 'linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.1))',
          animation: 'wave 8s ease-in-out infinite'
        }}></div>

        {/* Glowing orbs */}
        <div className="position-absolute" style={{
          top: '15%',
          right: '25%',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)',
          animation: 'glow 4s ease-in-out infinite'
        }}></div>
        <div className="position-absolute" style={{
          bottom: '25%',
          left: '20%',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)',
          animation: 'glow 5s ease-in-out infinite reverse'
        }}></div>

        {/* Particle effects */}
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

        {/* Animated triangles */}
        <div className="position-absolute" style={{
          top: '45%',
          right: '35%',
          width: '0',
          height: '0',
          borderLeft: '20px solid transparent',
          borderRight: '20px solid transparent',
          borderBottom: '35px solid rgba(255, 255, 255, 0.1)',
          animation: 'rotate3D 15s linear infinite'
        }}></div>
        <div className="position-absolute" style={{
          bottom: '35%',
          left: '35%',
          width: '0',
          height: '0',
          borderLeft: '15px solid transparent',
          borderRight: '15px solid transparent',
          borderBottom: '25px solid rgba(255, 255, 255, 0.1)',
          animation: 'rotate3D 12s linear infinite reverse'
        }}></div>

        {/* Animated rings */}
        <div className="position-absolute" style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '300px',
          height: '300px',
          border: '2px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          animation: 'expand 8s ease-in-out infinite'
        }}></div>
        <div className="position-absolute" style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '200px',
          height: '200px',
          border: '2px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          animation: 'expand 8s ease-in-out infinite 1s'
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
            <h3 className="text-primary mb-1 fw-bold">Admin Login</h3>
            <p className="text-muted">Please login to your admin account</p>
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
              {isLoading ? (
                <>
                  <div className="loading-container">
                    <div className="spinner-border spinner-border-sm me-2" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <span className="loading-text">Logging in</span>
                    <span className="loading-dots">
                      <span className="dot">.</span>
                      <span className="dot">.</span>
                      <span className="dot">.</span>
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt me-2"></i>
                  Admin Login
                </>
              )}
            </button>
          </form>

          <div className="mt-3 text-center">
            <span>Don't have an account? </span>
            <button type="button" className="btn btn-link p-0 align-baseline" onClick={onShowRegister} style={{textDecoration: 'underline'}}>Register</button>
          </div>

          <div className="mt-3 text-center">
            <span>Are you a lecturer? </span>
            <button type="button" className="btn btn-link p-0 align-baseline" onClick={onShowLecturerLogin} style={{textDecoration: 'underline'}}>Lecturer Login</button>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
          }

          @keyframes slideUp {
            from { 
              opacity: 0;
              transform: translateY(20px);
            }
            to { 
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }

          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          @keyframes slideRight {
            0% { transform: translateX(-100px); opacity: 0; }
            50% { transform: translateX(0); opacity: 1; }
            100% { transform: translateX(100px); opacity: 0; }
          }

          @keyframes slideLeft {
            0% { transform: translateX(100px); opacity: 0; }
            50% { transform: translateX(0); opacity: 1; }
            100% { transform: translateX(-100px); opacity: 0; }
          }

          @keyframes moveDot {
            0% { transform: translate(0, 0); }
            25% { transform: translate(100px, 50px); }
            50% { transform: translate(50px, 100px); }
            75% { transform: translate(-50px, 50px); }
            100% { transform: translate(0, 0); }
          }

          @keyframes wave {
            0% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0); }
          }

          @keyframes glow {
            0% { transform: scale(1); opacity: 0.5; }
            50% { transform: scale(1.2); opacity: 0.8; }
            100% { transform: scale(1); opacity: 0.5; }
          }

          @keyframes particle {
            0% { transform: translate(0, 0); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px); opacity: 0; }
          }

          @keyframes rotate3D {
            0% { transform: rotateY(0deg) rotateX(0deg); }
            50% { transform: rotateY(180deg) rotateX(180deg); }
            100% { transform: rotateY(360deg) rotateX(360deg); }
          }

          @keyframes expand {
            0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
            50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.5; }
            100% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
          }

          .form-control:focus {
            border-color: rgba(13, 110, 253, 0.5);
            box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
          }

          .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(13, 110, 253, 0.2);
            background: linear-gradient(45deg, rgba(13, 110, 253, 1), rgba(13, 110, 253, 0.9));
          }

          .loading-container {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
          }

          .loading-text {
            animation: pulse 1.5s ease-in-out infinite;
          }

          .loading-dots {
            display: inline-flex;
            align-items: center;
          }

          .loading-dots .dot {
            opacity: 0;
            animation: dotFade 1.4s infinite;
            margin-left: 2px;
          }

          .loading-dots .dot:nth-child(2) {
            animation-delay: 0.2s;
          }

          .loading-dots .dot:nth-child(3) {
            animation-delay: 0.4s;
          }

          @keyframes dotFade {
            0%, 100% { opacity: 0; }
            50% { opacity: 1; }
          }

          .spinner-border {
            border-width: 0.2em;
            animation: spinner-border 0.75s linear infinite, pulse 1.5s ease-in-out infinite;
          }

          @keyframes spinner-border {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Login; 