import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/login.css'; // Import the CSS file

export default function Login() {
  const [selectedRole, setSelectedRole] = useState(''); // State to manage selected role

  // Function to handle role selection
  const handleRoleSelection = (role) => {
    setSelectedRole(role);
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <a href="#">CivicConnect</a>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>

      <div className="container">
        <div className="login-card">
          <div className="login-form">
            <h2>Select Your Role</h2>
            <div className="role-buttons">
              <button
                className={`role-btn ${selectedRole === 'citizen' ? 'active' : ''}`}
                onClick={() => handleRoleSelection('citizen')}
              >
                Citizen
              </button>
              <button
                className={`role-btn ${selectedRole === 'government' ? 'active' : ''}`}
                onClick={() => handleRoleSelection('government')}
              >
                Government Authority
              </button>
            </div>

            <div className="signup-link">
              <Link to="/register" className="no-underline">Sign up</Link>
            </div>

            {/* Conditional rendering of login forms based on selected role */}
            <div className={`login-card-${selectedRole} ${selectedRole ? 'expanded' : ''}`}>
              {selectedRole === 'citizen' && (
                <>
                  <h2>Citizen Login</h2>
                  <p>Login to track or resolve complaints</p>
                  <form>
                    <label htmlFor="citizen-email">Email</label>
                    <input
                      type="email"
                      id="citizen-email"
                      placeholder="Enter your email"
                      required
                    />
                    <label htmlFor="citizen-password">Password</label>
                    <input
                      type="password"
                      id="citizen-password"
                      placeholder="Enter your password"
                      required
                    />
                    <button type="submit" className="login-btn">
                      Login
                    </button>
                    <div className="login-links">
                      <a href="#">Forgot Password?</a>
                    </div>
                  </form>
                </>
              )}

              {selectedRole === 'government' && (
                <>
                  <h2>Authority Login</h2>
                  <p>Login to manage civic complaints</p>
                  <form>
                    <label htmlFor="gov-email">Email</label>
                    <input
                      type="email"
                      id="gov-email"
                      placeholder="Enter your email"
                      required
                    />
                    <label htmlFor="gov-password">Password</label>
                    <input
                      type="password"
                      id="gov-password"
                      placeholder="Enter your password"
                      required
                    />
                    <button type="submit" className="login-btn">
                      Login
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>

          <div className="login-image">
            <img
              alt="Illustration of a laptop, coffee cup, and plant"
              src="https://storage.googleapis.com/a1aa/image/NGqjc5mXh4rND58P8ldOvND6BbSPEVf1yNIlXwCSfijG8tnTA.jpg"
            />
          </div>
        </div>
      </div>

      <footer className="footer">
        <p>© 2024 CivicConnect. All Rights Reserved.</p>
      </footer>
    </>
  );
}
