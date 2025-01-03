import React, { useState, useEffect } from 'react';
import './styles/dashboard.css';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [uniqueTitles, setUniqueTitles] = useState(null);
  const allStatuses = ['all','in progress', 'resolved', 'reported'];

  // Fetch complaints from the API
  const fetchComplaints = async () => {
    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
    try {
      const response = await fetch('http://localhost:5000/api/government/reported-issues', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      });
      const data = await response.json();
      setComplaints(data);
      setFilteredComplaints(data);

      // Remove duplicate titles
      const uniqueTitles = [...new Set(data.map(complaint => complaint.title))];
      setUniqueTitles(uniqueTitles);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };

  // Change the status of an issue
  const changeStatus = async (id, newStatus) => {
    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
    try {
      const response = await fetch(`http://localhost:5000/api/issues/modify/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
        body: JSON.stringify({ status: newStatus }), // Send the new status
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      const updatedComplaint = await response.json();
      // Update the local state to reflect the new status
      setComplaints((prevComplaints) =>
        prevComplaints.map((complaint) =>
          complaint._id === updatedComplaint.updatedIssue._id ? updatedComplaint.updatedIssue : complaint
        )
      );
      fetchComplaints(); // Re-fetch complaints to ensure the latest data
    } catch (error) {
      console.error('Error changing status:', error);
    }
  };

  // Filter complaints based on status
  const filterComplaintsByStatus = (status) => {
    const filtered = complaints.filter(
      (complaint) => status === 'all' || complaint.status === status
    );
    setFilteredComplaints(filtered);
    setSelectedTitle(null); // Reset title filter when status changes
  };

  // Filter complaints by title with deselect functionality
  const filterComplaintsByTitle = (title) => {
    if (selectedTitle === title) {
      // Deselect if the same title is clicked
      setSelectedTitle(null);
      filterComplaintsByStatus(statusFilter); // Reset to status filter
    } else {
      const filtered = complaints.filter((complaint) => complaint.title === title);
      setFilteredComplaints(filtered);
      setSelectedTitle(title); // Highlight the newly selected title
    }
  };

  useEffect(() => {
    fetchComplaints(); // Fetch complaints on component mount
  }, []);

  useEffect(() => {
    filterComplaintsByStatus(statusFilter); // Apply status filter whenever it changes
  }, [statusFilter, complaints]);

  return (
    <>
      <nav className="navbar">
        <div className="logo">CivicConnect</div>
        <ul>
          <li><Link to="/">Home</Link></li>
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
            {allStatuses.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className="titles-section">
          <h2>Titles</h2>
          <div className="titles-buttons">
            {filteredComplaints.length > 0 ? (
              [...new Set(filteredComplaints.map((complaint) => complaint.title))].map((title) => (
                <button
                  key={title}
                  className={`category-btn ${selectedTitle === title ? 'selected' : ''}`}
                  onClick={() => filterComplaintsByTitle(title)}
                >
                  {title}
                </button>
              ))
            ) : (
              <p>No complaints found for the selected status.</p>
            )}
          </div>
        </div>
        <div id="complaintsContainer" className="complaints-container">
  <h2>Complaint Details</h2>
  {filteredComplaints.length > 0 ? (
    filteredComplaints.map((complaint) => (
      <div key={complaint._id} className="complaint-card">
        <h3>{complaint.title}</h3>
        <p>{complaint.description}</p>
        <p><strong>Location:</strong> {complaint.location}</p>
        <p className="complaint-status">
          <strong>Status:</strong> {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
        </p>
        <label htmlFor={`status-select-${complaint._id}`} className="status-label">
  Change Status:
</label>
<select
  id={`status-select-${complaint._id}`}
  value={complaint.status}
  onChange={(e) => changeStatus(complaint._id, e.target.value)}
  className="status-dropdown"
>
  {allStatuses.filter((status) => status !== 'all').map((status) => (
    <option key={status} value={status}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </option>
  ))}
</select>

      </div>
    ))
  ) : (
    <p>No complaints found for the selected title.</p>
  )}
</div>

      </section>
      <footer>
        <p>© 2024 CivicConnect. All Rights Reserved.</p>
      </footer>
    </>
  );
}
