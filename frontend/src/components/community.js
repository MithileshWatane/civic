import React, { useState, useEffect } from 'react';
import './styles/community.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function CommunityUpdated() {
  const [projectName, setProjectName] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [description, setDescription] = useState('');
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [volunteeredProjects, setVolunteeredProjects] = useState(new Set());


  useEffect(() => {
    fetchProjects();
    loadVolunteeredProjects();
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
  const loadVolunteeredProjects = () => {
    const storedProjects = localStorage.getItem('volunteeredProjects');
    if (storedProjects) {
      setVolunteeredProjects(new Set(JSON.parse(storedProjects)));
    }
  };

  const saveVolunteeredProjects = (newProjects) => {
    localStorage.setItem('volunteeredProjects', JSON.stringify([...newProjects]));
  };

  const handleContribution = async (projectId) => {
    await axios.post(`http://localhost:5000/api/community/projects/${projectId}/contribute`, { amount: 1 });
    const updatedProjects = new Set([...volunteeredProjects, projectId]);
    setVolunteeredProjects(updatedProjects);
    saveVolunteeredProjects(updatedProjects);
    fetchProjects(); // Refresh the project list to update funding
  };


  return (
    <>
      <nav className="navbar">
        <div className="logo">CivicConnect</div>
        <ul>
          <li>
            <Link to="/">Home</Link></li>
          <li>
             <Link to="/issue">Report Issues</Link>
          </li>
          <li><Link to="/trending">Trending Issues</Link></li>
                        
        </ul>
      </nav>

      <section className="community-section" id="community">
        <h2>By the people for the people</h2>
        <p>Together, we shape the future we want to see.
          Every voice matters, every effort counts.
           Be the change you wish to witness.
             Volunteer, participate, and make a difference.
             Join hands, because this is by the people, for the people</p>
      </section>

      <section className="crowdfunding-section">
        <h2>Support Local Initiatives</h2>
        <p>Contribute to social campaigns that aim to enhance our community. Together, we can achieve great things!</p>
        <button onClick={() => setShowForm(!showForm)} className="btn">
          {showForm ? 'Cancel' : 'New Project'}
        </button>
        {showForm && (
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
            <label htmlFor="goalAmount">Volunteers Required :</label>
            <input
              type="number"
              id="goalAmount"
              value={goalAmount}
              onChange={(e) => setGoalAmount(e.target.value)}
              required
              placeholder="Number of Volunteers Required"
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
        )}
      </section>
      <section className="monitoring-section">
        <h2>Monitor Your Contributions</h2>
        <p>Keep track of the projects you support. Stay informed about progress and updates.</p>
        <div className="project-list">
          {projects.map((project) => (
            <div className="project-card" key={project._id}>
              <h3>{project.name}</h3>
              <p>Volunteers Required: {project.goalAmount} | Active participants: {project.funding}</p>
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{
                    width: `${Math.min((project.funding / project.goalAmount) * 100, 100)}%`,
                  }}
                />
              </div>
              <p className="progress-text">
                {Math.min((project.funding / project.goalAmount) * 100, 100).toFixed(2)}% completed
              </p>
              {project.funding >= project.goalAmount ? (
                <p className="goal-completed">Goal is Completed</p>
              ) : volunteeredProjects.has(project._id) ? (
                <p className="already-volunteered">You have participated</p>
              ) : (
                <button onClick={() => handleContribution(project._id)} className="btn">
                   Participate
                </button>
              )}
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
