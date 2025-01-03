import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/profile.css';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:5000/api/users/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data.user);

          const issuesResponse = await axios.get('http://localhost:5000/api/issues/user', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setIssues(issuesResponse.data.issues);
        } else {
          setError('No token found');
        }
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const deleteIssue = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/issues/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIssues(issues.filter(issue => issue._id !== id)); // Update state to remove deleted issue
    } catch (err) {
      setError('Error deleting issue');
    }
  };

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
          <li><Link to="/issue">Report Issues</Link></li>
          <li><Link to="/trending">Trending Issues</Link></li>
        </ul>
      </nav>

      <h1>Profile</h1>

      <div className="main-content">
        <div className="sidebar">
          <div className="user-info">
            {user && (
              <>
                <h1>Profile</h1>
                <h3 color='blue'>Name: </h3><br />
                <h2>{user.name}</h2><br />
                <h3>Email: </h3><br />
                <h2>{user.email}</h2>
              </>
            )}
          </div>
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
                  Reported To: {issue.governmentAuthority.name} ({issue.governmentAuthority.email}) <br /><br></br>
                  <button onClick={() => deleteIssue(issue._id)}>Delete</button> {/* Delete button */}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <footer>
        <p>© 2024 CivicConnect. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Profile;