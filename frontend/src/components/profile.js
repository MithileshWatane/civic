import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/profile.css'; // Assuming you have a separate CSS file for styling
import { Link } from 'react-router-dom';



const Profile = () => {
  const [user, setUser] = useState();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data.user);
    
        
        const issuesResponse = await axios.get('http://localhost:5000/api/issues/user' , {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming you're storing the token in localStorage
          }
        }); // Adjust based on your API
        setIssues(issuesResponse.data.issues);
      } catch (error) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (

    <div className="profile-page">
       <nav className="navbar">
              <div className="logo">CivicConnect</div>
              <ul>
                <li><Link to="/">Home</Link></li>
            
              </ul>
            </nav>
      <h1>Profile</h1>
      
      <div className="profile-card">
        {user && (
          <>
            <h2>{user.name}</h2>
            <p>Email: {user.email}</p>
            <p>Name :  {user.name}</p>
          </>
        )}
      </div>

      <div className="issues">
        <h3>Reported Issues</h3>
        {issues.length === 0 ? (
          <p>No issues reported by User.</p>
        ) : (
          <ul>
            {issues.map((issue) => (
              <li key={issue._id}>
                <strong>{issue.title}</strong> <br />
                Description: {issue.description} <br />
                Location: {issue.location} <br />
                Status: {issue.status} <br />
                Reported To: {issue.governmentAuthority.name} ({issue.governmentAuthority.email})
              </li>
            ))}
          </ul>
        )}
      </div>
      <footer>
        <p>© 2024 CivicConnect. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Profile;
