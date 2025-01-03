import React from 'react';
import './styles/navbar.css'; // Assuming you have a separate CSS file for navbar styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">CivicConnect</div>
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/profile">Profile</a></li>
        <li><a href="/issues">Issues</a></li>
        <li><a href="/login">Login</a></li>
        <li><a href="/register">Register</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;