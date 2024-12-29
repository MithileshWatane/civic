import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/index.css';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check login status on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    setIsLoggedIn(false);
    navigate('/login'); // Redirect to login page
  };
  // const userToken = localStorage.getItem('token');
  // if (userToken) {
  //   console.log('Logged-in user token:', userToken);
  // } else {
  //   console.log('No user is logged in.');
  // }
  const requireAuth = (navigate) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to continue.');
      navigate('/login'); // Redirect to login page
      return false;
    }
    return true;
  };
  
  const handleReportIssueClick2 = () => {
    if (requireAuth(navigate)) {
      navigate('/trending'); 
    }
  };
  
  const handleReportIssueClick1 = () => {
    if (requireAuth(navigate)) {
      navigate('/complaints'); 
    }
  };
  
  const handleReportIssueClick3 = () => {
    if (requireAuth(navigate)) {
      navigate('/community'); 
    }
  };

  return (
    <div className="main">
      <nav className="navbar">
        <div className="logo">
          Civic<span style={{ color: 'blue' }}>Connect</span>
        </div>
        <ul>
          <li onClick={handleReportIssueClick1}>
            <Link to="/">Report Issues</Link>
          </li>
          <li onClick={handleReportIssueClick2}>
            <Link to="/">Trending Issues</Link>
          </li>
          <li onClick={handleReportIssueClick3}>
            <Link to="/">Community</Link>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                  <img
                    src="data:image/png;base64,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" // Replace with user profile image URL
                    alt="Profile"
                    height={35}
                    className="profile-logo"
                  />
                
              </li>
              <li >
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      <header className="hero">
        <div className="overlay" />
        <div className="hero-content">
          <h1>'Empower Your Voice'</h1>
          <p>Report issues, track progress, and improve your community.</p>
          <Link to="/complaints" className="btn hero-btn">
            Report Now
          </Link>
        </div>
      </header>




      <div className="features">
        <h1>Features </h1>
      </div>
        
    <div class="features">


  
        
        <div class="card">
          <div class="card-image"></div>
          <div class="card-content">
          <h3>Report Issues</h3>
            <p>Quickly report civic issues affecting your community.</p>
            <Link to="/complaints" className="btn">
              Get Started
            </Link>
          </div>
        </div>
      
     
      <div class="card">
          <div class="card-image"></div>
          <div class="card-content">
          <h3>Trending Issues</h3>
            <p>Stay updated on the most discussed issues in your area.</p>
            <Link to="/trending" className="btn">
              Explore Now
            </Link>
          </div>
        </div>
        <div class="card">
          <div class="card-image"></div>
          <div class="card-content">
          <h3>Funding</h3>
            <p>Support community-driven change by contributing to civic solutions</p>
            <Link to="/community" className="btn">
              Funds
            </Link>
          </div>
        </div><div class="card">
          <div class="card-image"></div>
          <div class="card-content">
          <h3>Track Progress</h3>
            <p>Monitor reported issues in real-time.</p>
            <Link to="/dashboard" className="btn">
              Check Status
            </Link>
          </div>
        </div><div class="card">
          <div class="card-image"></div>
          <div class="card-content">
          <h3>Community Engagement</h3>
            <p>Connect with other citizens and participate in discussions.</p>
            <Link to="/community" className="btn">
              Join Us
            </Link>
          </div>
        </div><div class="card">
          <div class="card-image"></div>
          <div class="card-content">
          <h3>Government</h3>
            <p>Support from government <br /> Authorities.</p>
          
          <Link to="/register" className="btn">
              Register
            </Link>
        </div>
        </div>
     
        </div>
{/* <section className="features">
          <div className="card">
            <h3>Report Issues</h3>
            <p>Quickly report civic issues affecting your community.</p>
            <Link to="/complaints" className="btn">
              Get Started
            </Link>
          </div>
          <div className="card">
            <h3>Trending Issues</h3>
            <p>Stay updated on the most discussed issues in your area.</p>
            <Link to="/trending" className="btn">
              Explore Now
            </Link>
          </div>
          <div className="card">
            <h3>Funding</h3>
            <p>Collaborate for a cause</p>
            <Link to="/community" className="btn">
              Funds
            </Link>
          </div>
          <div className="card">
            <h3>Track Progress</h3>
            <p>Monitor reported issues in real-time.</p>
            <Link to="/dashboard" className="btn">
              Check Status
            </Link>
          </div>
          <div className="card">
            <h3>Community Engagement</h3>
            <p>Connect with other citizens and participate in discussions.</p>
            <Link to="/community" className="btn">
              Join Us
            </Link>
          </div>
          <div className="card">
            <h3>Government</h3>
            <p>Support from government authorities.</p>
          </div>
        </section> */}




   <footer id="contact">
          <p>© 2024 CivicConnect. All Rights Reserved.</p>
        </footer>



        </div>
  );
}
