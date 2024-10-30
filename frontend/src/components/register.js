import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Updated import
import axios from 'axios';
import './styles/register.css'; // Import the CSS file

export default function Register() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Updated from useHistory to useNavigate

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
  
    try {
      // Use the correct backend server URL (e.g., http://localhost:5000)
      const endpoint = selectedRole === 'citizen' ? 'http://localhost:5000/api/register/citizen' : 'http://localhost:5000/api/register/government';
      
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };
  
      const response = await axios.post(endpoint, payload);
  
      if (response.status === 201) {
        // Redirect to login page or dashboard after successful registration
        navigate('/login');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Registration failed');
    }
  };
  
  return (
    <>
      <div className="navbar">
        <div className="logo">
          <a href="#">CivicConnect</a>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </div>

      <div className="register-wrapper">
        <div className="register-content">
          <h2>Select Registration Type</h2>
          <div className="role-selection">
            <button
              onClick={() => handleRoleSelection('citizen')}
              className={`role-btn ${selectedRole === 'citizen' ? 'active' : ''}`}
            >
              Register as Citizen
            </button>
            <button
              onClick={() => handleRoleSelection('government')}
              className={`role-btn ${selectedRole === 'government' ? 'active' : ''}`}
            >
              Register as Government Authority
            </button>
          </div>

          <div className={`register-card tab-content ${selectedRole ? 'active' : ''}`}>
            {selectedRole && (
              <div>
                <h2>{selectedRole === 'citizen' ? 'Create a Citizen Account' : 'Create a Government Account'}</h2>
                <p>Join us for a better experience</p>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    placeholder={selectedRole === 'citizen' ? 'name' : 'name'}
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <button type="submit" className="register-btn">
                    Register as {selectedRole === 'citizen' ? 'Citizen' : 'Authority'}
                  </button>
                </form>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <div className="register-links">
                  <Link to="/login">Already have an account? Login</Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="footer">
        <p>© 2024 CivicConnect. All rights reserved.</p>
      </footer>
    </>
  );
}
