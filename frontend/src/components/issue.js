import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/complaints.css';
import { navigate } from 'react-router-dom';

const CivicIssueForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '', // Simple string for location
    governmentAuthority: '',
  });

  const [Authorities, setAuthorities] = useState([]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Fetch authorities from the backend
  const fetchAuthorities = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/government-authorities/get');
      const data = await response.json();
      setAuthorities(data); // Populate dropdown with data
    } catch (error) {
      console.error('Error fetching authorities:', error);
    }
  };

  // Call fetchAuthorities when the component mounts
  useEffect(() => {
    fetchAuthorities();
  }, []); // Empty dependency array ensures it runs only once

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const issueData = {
      title: formData.title,
      description: formData.description,
      location: formData.location, // Simple string for location
      governmentAuthority: formData.governmentAuthority,
    };

    try {
      const response = await fetch('http://localhost:5000/api/issues/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // JWT for user authentication
        },
        body: JSON.stringify(issueData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Issue reported successfully!');
        setFormData({
          title: '',
          description: '',
          location: '',
          governmentAuthority: '',
        });
      } else {
        alert(data.message || 'Failed to report the issue. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting issue:', error);
      alert('An error occurred while reporting the issue.');
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">CivicConnect</div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/trending">Trending Issues</Link></li>
          <li>
                          <Link to="/community">Community</Link>
                        </li>
          

        </ul>
      </nav>
      <div className="issue-form">
        <h2>Raise Civic Issue</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Issue Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="description">Issue Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Enter location as a string (e.g., '123 Main St, Springfield')"
              required
            />
          </div>
          <div>
            <label htmlFor="governmentAuthority">Assign to Authority:</label>
            <select
              id="governmentAuthority"
              name="governmentAuthority"
              value={formData.governmentAuthority}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Authority</option>
              {Authorities.map((auth) => (
                <option key={auth._id} value={auth._id}>
                  {auth.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Submit Issue</button>
        </form>

        
      </div>

      <footer>
        <p>© 2024 CivicConnect. All Rights Reserved.</p>
      </footer>
    </>
  );
};

export default CivicIssueForm;
