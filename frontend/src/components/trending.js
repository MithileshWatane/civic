import React from 'react';
import './styles/trending.css';
import { Link } from 'react-router-dom';

export default function Trending() {
  

  return (
    <>

      <nav className="navbar">
        <div className="logo">CivicConnect</div>
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
              <Link to="/login">Login</Link>
            </li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* Trending Issues Section */}
      <section className="trending-section" id="trending">
        <h2>Trending Issues</h2>
        <div className="issue-card-container">
          <div className="issue-card">
            <h3>Potholes in City Center</h3>
            <p>Reported by 12 citizens</p>
            <a href="#" className="cta-button">View Details</a>
          </div>
          <div className="issue-card">
            <h3>Broken Streetlights</h3>
            <p>Reported by 20 citizens</p>
            <a href="#" className="cta-button">View Details</a>
          </div>
          <div className="issue-card">
            <h3>Water Leakage in East End</h3>
            <p>Reported by 8 citizens</p>
            <a href="#" className="cta-button">View Details</a>
          </div>
        </div>
      </section>

      <footer id="contact">
        <p>© 2024 CivicConnect. All Rights Reserved.</p>
      </footer>
    </>
  );
}
