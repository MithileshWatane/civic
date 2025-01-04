import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/profile.css';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [issues, setIssues] = useState([]);
  const [projects, setProjects] = useState([]); // Added state for projects
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Fetch user details
          const response = await axios.get('http://localhost:5000/api/users/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data.user);

          // Fetch user's reported issues
          const issuesResponse = await axios.get('http://localhost:5000/api/issues/user', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setIssues(issuesResponse.data.issues);

          // Fetch all projects and filter by user ID (createdBy field)
          const projectsResponse = await axios.get('http://localhost:5000/api/community/projects', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          
          const userId = response.data.user._id; // Extract userId from user response

          // Filter projects created by this user
          const createdProjects = projectsResponse.data.filter(
            (project) => project.createdBy === userId
          );
          setProjects(createdProjects);
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
      setIssues(issues.filter((issue) => issue._id !== id));
    } catch (err) {
      setError('Error deleting issue');
    }
  };

  const calculateIssueStats = () => {
    const total = issues.length;
    const reported = issues.filter((issue) => issue.status === 'reported').length;
    const inProgress = issues.filter((issue) => issue.status === 'in Progress').length;
    const resolved = issues.filter((issue) => issue.status === 'resolved').length;

    return { total, reported, inProgress, resolved };
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  const { total, reported, inProgress, resolved } = calculateIssueStats();

  // Data for Pie Chart
  const pieChartData = [
    { name: 'Reported', value: reported },
    { name: 'In Progress', value: inProgress },
    { name: 'Resolved', value: resolved },
  ];

  const COLORS = ['#ffbb33', '#33b5e5', '#00C49F']; // Colors for chart segments

  return (
    <div className="profile-page">
      <nav className="navbar">
         <Link to="/" className="logo" >
                  Civic<span style={{ color: 'blue' }}>Connect</span>
                  </Link>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/issue">Report Issues</Link></li>
          <li><Link to="/trending">Trending Issues</Link></li>
        </ul>
      </nav>

      <div className="main-content">
        <div className="sidebar">
          <div className="user-info">
            {user && (
              <>
                <h1>Profile</h1>
                <h3>Name:</h3>
                <h2>{user.name}</h2>
                <br />
                <h3>Email:</h3>
                <h2>{user.email}</h2>
                <div className="issue-stats">
                  <h4>Issue Statistics:</h4>
                  <p>Total Issues: {total}</p>
                  <p>Reported: {reported}</p>
                  <p>In Progress: {inProgress}</p>
                  <p>Resolved: {resolved}</p>

                  <div className="pie-chart-profile">
                    <h4>Visualization:</h4>
                    {total > 0 ? (
                      <PieChart width={200} height={300}>
                        <Pie
                          data={pieChartData}
                          cx="50%"
                          cy="50%"
                          label
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {pieChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    ) : (
                      <p>No issues to display on the chart.</p>
                    )}
                  </div>
                </div>
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
                  Reported To: {issue.governmentAuthority.name} ({issue.governmentAuthority.email}) <br />
                  <button onClick={() => deleteIssue(issue._id)}>Delete</button>
                </li>
              ))}
            </ul>
          )}

<div className="projects">
          <h3>Projects Created by You</h3>
          {projects.length === 0 ? (
            <p>No projects created by you.</p>
          ) : (
            <ul>
              {projects.map((project) => (
                <li key={project._id}>
                  <strong>{project.name}</strong> <br />
                  Description: {project.description} <br />
                  Volunteers Required: {project.goalAmount} <br />
                  Active participants: {project.funding} <br />
                </li>
              ))}
            </ul>
          )}
        </div>
        </div>

        
      </div>

      <footer>
        <p>© 2024 CivicConnect. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Profile;
