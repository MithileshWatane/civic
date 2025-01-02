import React, { useState, useEffect } from 'react';
import './styles/community.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function CommunityUpdated() {
  const [projectName, setProjectName] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [description, setDescription] = useState('');
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([
    { user: 'User1', text: 'Excited about the new park project!' },
    { user: 'User2', text: 'Let’s raise the funds together!' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const response = await axios.get('/api/community/projects');
    setProjects(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/community/projects', { name: projectName, goalAmount, description });
    fetchProjects(); // Refresh the project list
    setProjectName('');
    setGoalAmount('');
    setDescription('');
  };

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      await axios.post('/api/community/messages', { user: 'You', text: newMessage });
      setMessages([...messages, { user: 'You', text: newMessage }]);
      setNewMessage('');
    }
  };

  const handleUpvote = async (projectId) => {
    await axios.post(`/api/community/projects/${projectId}/upvote`);
    fetchProjects(); // Refresh the project list to update upvote count
  };

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

      <section className="community-section" id="community">
        <h2>Join a Community</h2>
        <p>Collaborate with fellow citizens, discuss solutions, and take action to improve your neighborhood. Your voice matters.</p>
        <a href="#" className="cta-button">Explore Communities</a>
      </section>

      <section className="crowdfunding-section">
        <h2>Support Local Initiatives</h2>
        <p>Contribute to crowdfunding campaigns that aim to enhance our community. Together, we can achieve great things!</p>
        <form id="crowdfundingForm" onSubmit={handleSubmit}>
          <label htmlFor="projectName">Project Name:</label>
          <input
            type="text"
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
            placeholder="Enter project name"
          />
          
          <label htmlFor="goalAmount">Funding Goal ($):</label>
          <input
            type="number"
            id="goalAmount"
            value={goalAmount}
            onChange={(e) => setGoalAmount(e.target.value)}
            required
            placeholder="Enter goal amount"
          />
          
          <label htmlFor="description">Project Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            placeholder="Describe your project..."
            required
          />
          
          <button type="submit" className="btn">Submit Project</button>
        </form>
      </section>

      <section className="monitoring-section">
        <h2>Monitor Your Contributions</h2>
        <p>Keep track of the projects you support. Stay informed about progress and updates.</p>
        <div className="project-list">
          {projects.map((project) => (
            <div className="project-card" key={project._id}>
              <h3>{project.name}</h3>
              <p>Goal: ${project.goalAmount} | Upvotes: {project.upvotes}</p>
              <div className="progress-bar">
                <div className="progress" style={{ width: `${(project.upvotes / project.goalAmount) * 100}%` }} />
              </div>
              <button onClick={() => handleUpvote(project._id)}>Upvote</button>
            </div>
          ))}
        </div>
      </section>

      
      <footer>
        <p>© 2024 CivicConnect. All Rights Reserved.</p>
      </footer>
    </>
  );
}
