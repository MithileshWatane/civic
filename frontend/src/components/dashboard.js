import React, { useState, useEffect } from 'react';
import './styles/dashboard.css';
// import './styles/main.css';
import { Link } from 'react-router-dom';

const complaintsData = [
  { id: 1, domain: 'Road safty', description: 'Potholes on Main Street', status: 'pending' },
  { id: 2, domain: 'Garbage', description: 'Overflowing bins at the park', status: 'in-progress' },
  { id: 3, domain: 'Electricity', description: 'Streetlights not working on Elm Road', status: 'resolved' },
  { id: 4, domain: 'Water supply', description: 'Water leakage near Market Street', status: 'pending' },
  { id: 5, domain: 'Animal related', description: 'Stray dog near school area', status: 'resolved' },
];

export default function Dashboard() {
  const [complaints, setComplaints] = useState(complaintsData);
  const [filteredComplaints, setFilteredComplaints] = useState(complaintsData);
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedDomain, setSelectedDomain] = useState('all');

  // Filter complaints based on domain and status
  const filterComplaints = (domain, status) => {
    const filtered = complaintsData.filter(complaint => {
      const matchesDomain = domain === 'all' || complaint.domain === domain;
      const matchesStatus = status === 'all' || complaint.status === status;
      return matchesDomain && matchesStatus;
    });
    setFilteredComplaints(filtered);
  };

  useEffect(() => {
    filterComplaints(selectedDomain, statusFilter);
  }, [selectedDomain, statusFilter]);

  return (
    <>
      <nav className="navbar">
        <div className="logo">CivicConnect</div>
        <ul>
        <li><Link to="/">Home</Link></li>

        <li>
              <Link to="/complaints">Report Issues</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
        </ul>
      </nav>
      <section className="dashboard">
        <h1>Authority Dashboard</h1>
        <div className="filters">
          <label htmlFor="statusFilter">Filter by Status:</label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
        <div className="complaint-sections">
          <h2>Complaint Domains</h2>
          <div className="complaint-categories">
            <button className="category-btn" onClick={() => setSelectedDomain('road')}>Road safety</button>
            <button className="category-btn" onClick={() => setSelectedDomain('garbage')}>Garbage</button>
            <button className="category-btn" onClick={() => setSelectedDomain('electricity')}>Electricity</button>
            <button className="category-btn" onClick={() => setSelectedDomain('water')}>Water supply</button>
            <button className="category-btn" onClick={() => setSelectedDomain('building')}>Infrastructural</button>
            <button className="category-btn" onClick={() => setSelectedDomain('nature')}>Natural disaster</button>
            <button className="category-btn" onClick={() => setSelectedDomain('trees')}>Trees related</button>
            <button className="category-btn" onClick={() => setSelectedDomain('animal')}>Animal related</button>
          </div>
          <div id="complaintsContainer" className="complaints-container">
            {filteredComplaints.length > 0 ? (
              filteredComplaints.map((complaint) => (
                <div key={complaint.id} className="complaint-card">
                  <h3>{complaint.domain}</h3>
                  <p>{complaint.description}</p>
                  <p className="complaint-status">Status: {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}</p>
                </div>
              ))
            ) : (
              <p>No complaints found.</p>
            )}
          </div>
        </div>
      </section>
      <footer>
        <p>© 2024 CivicConnect. All Rights Reserved.</p>
      </footer>
    </>
  );
}
