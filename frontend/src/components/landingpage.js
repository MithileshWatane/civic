import React from 'react';
import { Link } from 'react-router-dom';
import './styles/index.css';


export default function App() {
  return (
  <div className="main">

        <nav className="navbar">
        <div className="logo">
  Civic<span style={{ color: 'blue' }}>Connect</span>
</div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/complaints">Report Issues</Link>
            </li>
            <li>
              <Link to="/trending">Trending Issues</Link>
            </li>
            <li>
              <Link to="/community">Community</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="#contact">Contact</Link>
            </li>
          </ul>
        </nav>
        
        <header className="hero">
          <div className="overlay" />
          <div className="hero-content">
            <h1>' Empower Your Voice '</h1>
            <p>Report issues, track progress, and improve your community.</p>
            <div></div>
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
