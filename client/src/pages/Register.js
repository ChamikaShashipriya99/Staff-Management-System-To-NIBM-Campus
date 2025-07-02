import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const Register = ({ onRegister, onShowLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    lecturerId: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.lecturerId.trim()) newErrors.lecturerId = 'Lecturer ID is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm your password';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/lecturer/register', {
        name: formData.name,
        lecturerId: formData.lecturerId,
        email: formData.email,
        password: formData.password
      });
      if (response.data.success) {
        setIsRegisterSuccess(true);
        setTimeout(() => {
          onRegister();
        }, 3500);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
      setIsLoading(false);
    }
  };

  if (isRegisterSuccess) {
    return (
      <div 
        className="min-vh-100 d-flex align-items-center justify-content-center"
        style={{
          background: 'linear-gradient(135deg, rgba(13, 110, 253, 0.95) 0%, rgba(13, 110, 253, 0.85) 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
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
        <h3 className="text-white mt-4 mb-2 success-title">Registration Successful!</h3>
        <p className="text-white-50 success-subtitle">Redirecting to login...</p>
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
      {/* Animated background elements */}
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
      
      {/* Registration Card */}
      <div className="card shadow p-4" style={{ minWidth: 350, maxWidth: 400, borderRadius: 20, position: 'relative', zIndex: 1 }}>
        <div className="text-center mb-4">
          <div style={{
            background: '#e3f0ff',
            borderRadius: '50%',
            width: 64,
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px auto',
            fontSize: 32,
            color: '#0d6efd'
          }}>
            <i className="fas fa-user-plus"></i>
          </div>
          <h2 className="fw-bold" style={{ color: '#1769ff' }}>Create Account</h2>
          <div className="text-muted mb-2">Please register to create your account</div>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3 input-group">
            <span className="input-group-text bg-white border-end-0"><i className="fas fa-user"></i></span>
            <input type="text" className={`form-control border-start-0${errors.name ? ' is-invalid' : ''}`} id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" required />
            {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
          </div>
          <div className="mb-3 input-group">
            <span className="input-group-text bg-white border-end-0"><i className="fas fa-id-badge"></i></span>
            <input type="text" className={`form-control border-start-0${errors.lecturerId ? ' is-invalid' : ''}`} id="lecturerId" name="lecturerId" value={formData.lecturerId} onChange={handleInputChange} placeholder="Lecturer ID" required />
            {errors.lecturerId && <div className="invalid-feedback d-block">{errors.lecturerId}</div>}
          </div>
          <div className="mb-3 input-group">
            <span className="input-group-text bg-white border-end-0"><i className="fas fa-envelope"></i></span>
            <input type="email" className={`form-control border-start-0${errors.email ? ' is-invalid' : ''}`} id="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" required />
            {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
          </div>
          <div className="mb-3 input-group">
            <span className="input-group-text bg-white border-end-0"><i className="fas fa-lock"></i></span>
            <input type="password" className={`form-control border-start-0${errors.password ? ' is-invalid' : ''}`} id="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="Password" required />
            {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
          </div>
          <div className="mb-3 input-group">
            <span className="input-group-text bg-white border-end-0"><i className="fas fa-lock"></i></span>
            <input type="password" className={`form-control border-start-0${errors.confirmPassword ? ' is-invalid' : ''}`} id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} placeholder="Confirm Password" required />
            {errors.confirmPassword && <div className="invalid-feedback d-block">{errors.confirmPassword}</div>}
          </div>
          <button type="submit" className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2" disabled={isLoading}>
            <i className="fas fa-user-plus"></i>
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <div className="mt-3 text-center">
          <span>Already have an account? </span>
          <button type="button" className="btn btn-link p-0 align-baseline" onClick={onShowLogin} style={{textDecoration: 'underline'}}>Login</button>
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

export default Register; 