



import React from 'react';
import { Link } from 'react-router-dom';
import './styles/complaints.css'; // Import the CSS file for styling

const CivicIssueForm = () => {
  return (
    <>
    <nav className="navbar">
    <div className="logo">CivicConnect</div>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/dashboard">Dashboard</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  </nav>
    <div className="issue-form">
      <h2>Raise Civic Issue</h2>
      <form>
        <div>
          <label htmlFor="issue-title">Issue Title:</label>
          <input type="text" id="issue-title" name="issueTitle" required />
        </div>
        <div>
          <label htmlFor="issue-description">Issue Description:</label>
          <textarea id="issue-description" name="issueDescription" required></textarea>
        </div>
        <div>
          <label htmlFor="issue-category">Category:</label>
          <select id="issue-category" name="issueCategory" required>
            <option value="">Select Category</option>
            <option value="Roads">Roads</option>
            <option value="Water">Water</option>
            <option value="Electricity">Electricity</option>
            <option value="Sanitation">Sanitation</option>
          </select>
        </div>
        <div>
          <label>Tag Local Authorities:</label>
          <button type="button" className="tag-btn">Water Dept</button>
          <button type="button" className="tag-btn">Roads Dept</button>
          <button type="button" className="tag-btn">Electricity Dept</button>
          <button type="button" className="tag-btn">Municipal Office</button>
          <div className="tagged-authorities">Tagged Authorities: None</div>
        </div>
        <div>
          <label htmlFor="issue-file">Attach File (optional):</label>
          <input type="file" id="issue-file" name="issueFile" />
        </div>
        <button type="submit">Submit Issue</button>
      </form>
    </div>
    </>
  );
};

export default CivicIssueForm;
