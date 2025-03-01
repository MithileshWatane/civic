import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/complaints.css';

const CivicIssueForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    governmentAuthority: '',
  });

  const [images, setImages] = useState([]);
  const [Authorities, setAuthorities] = useState([]);
  const navigate = useNavigate();

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image selection
  const handleImageChange = (e) => {
    setImages(e.target.files); // Store selected files
  };

  // Fetch authorities from the backend
  const fetchAuthorities = async () => {
    try {
      const response = await fetch('https://civicdeploy-1.onrender.com/api/government-authorities/get');
      const data = await response.json();
      setAuthorities(data);
    } catch (error) {
      console.error('Error fetching authorities:', error);
    }
  };

  useEffect(() => {
    fetchAuthorities();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('location', formData.location);
    formDataToSend.append('governmentAuthority', formData.governmentAuthority);

    // Append selected images
    for (let i = 0; i < images.length; i++) {
      formDataToSend.append('images', images[i]);
    }

    try {
      const response = await fetch('http://localhost:5000/api/issues/report', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formDataToSend, // Use FormData
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
        setImages([]); // Clear images
        navigate('/profile');
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
         <Link to="/" className="logo" >
                  Civic<span style={{ color: 'blue' }}>Connect</span>
                  </Link>
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
        <form onSubmit={handleSubmit} encType="multipart/form-data">
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
          <div>
            <label htmlFor="images">Upload Images:</label>
            <input
              type="file"
              id="images"
              name="images"
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <button type="submit">Submit Issue</button>
        </form>

        
      </div>

      <footer>
        <p>© 2025 CivicConnect. All Rights Reserved.</p>
      </footer>
    </>
  );
};

export default CivicIssueForm;
