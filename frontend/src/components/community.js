import React, { useState } from 'react';
import './styles/community.css';
// import './styles/main.css';
import { Link } from 'react-router-dom';

export default function Community() {
  const [projectName, setProjectName] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [description, setDescription] = useState('');
  const [messages, setMessages] = useState([
    { user: 'User1', text: 'Excited about the new park project!' },
    { user: 'User2', text: 'Let’s raise the funds together!' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ projectName, goalAmount, description });
    // Reset form fields
    setProjectName('');
    setGoalAmount('');
    setDescription('');
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { user: 'You', text: newMessage }]);
      setNewMessage('');
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">CivicConnect</div>
        <ul>
        <li><Link to="/">Home</Link></li>

        <li><Link to="/dashboard">Dashboard</Link></li>
        <li>
              <Link to="/login">Login</Link>
            </li>
        </ul>
      </nav>

      {/* Community Collaboration Section */}
      <section className="community-section" id="community">
        <h2>Join a Community</h2>
        <p>Collaborate with fellow citizens, discuss solutions, and take action to improve your neighborhood. Your voice matters.</p>
        <a href="#" className="cta-button">Explore Communities</a>
      </section>

      {/* Crowdfunding Section */}
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

      {/* Monitoring Features Section */}
      <section className="monitoring-section">
        <h2>Monitor Your Contributions</h2>
        <p>Keep track of the projects you support. Stay informed about progress and updates.</p>
        <div className="project-list">
          <div className="project-card">
            <h3>Community Park Renovation</h3>
            <p>Goal: $10,000 | Raised: $7,500</p>
            <div className="progress-bar">
              <div className="progress" style={{ width: "75%" }} />
            </div>
          </div>
          <div className="project-card">
            <h3>Street Lighting Initiative</h3>
            <p>Goal: $5,000 | Raised: $3,000</p>
            <div className="progress-bar">
              <div className="progress" style={{ width: "60%" }} />
            </div>
          </div>
        </div>
      </section>

      {/* Chat Feature Section */}
      <section className="chat-section">
        <h2>Join the Discussion</h2>
        <div className="chat-box">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            rows={3}
          />
          <button className="btn" onClick={handleSendMessage}>Send</button>
        </div>
        <div className="chat-history">
          {messages.map((msg, index) => (
            <p key={index}><strong>{msg.user}:</strong> {msg.text}</p>
          ))}
        </div>
      </section>

      <footer>
        <p>© 2024 CivicConnect. All Rights Reserved.</p>
      </footer>
    </>
  );
}
