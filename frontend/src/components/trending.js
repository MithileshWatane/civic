import React, { useEffect, useState } from 'react';
import './styles/trending.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Trending() {
  const [trendingIssues, setTrendingIssues] = useState([]);
  const [upvotedIssues, setUpvotedIssues] = useState(new Set());

  // Load upvoted issues from local storage
  useEffect(() => {
    const storedUpvotedIssues = JSON.parse(localStorage.getItem('upvotedIssues')) || [];
    setUpvotedIssues(new Set(storedUpvotedIssues));
  }, []);

  useEffect(() => {
    const fetchTrendingIssues = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/issues/get'); // Adjust the endpoint as necessary
        setTrendingIssues(response.data.issues); // Assuming the response contains an 'issues' array
      } catch (error) {
        console.error('Error fetching trending issues:', error);
      }
    };

    fetchTrendingIssues();
  }, []);

  const handleUpvote = async (issueId) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/issues/trending/${issueId}/upvote`,
        { upvote: true }, // Send upvote action in the request body
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token for authentication
          },
        }
      );

      // Update the local state to reflect the new vote count
      setTrendingIssues((prevIssues) =>
        prevIssues.map((issue) =>
          issue._id === issueId ? { ...issue, votes: response.data.votes } : issue
        )
      );

      // Add the issue to the upvotedIssues set and save to local storage
      setUpvotedIssues((prev) => {
        const updated = new Set(prev);
        updated.add(issueId);
        localStorage.setItem('upvotedIssues', JSON.stringify([...updated]));
        return updated;
      });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert('You have already upvoted this issue.');
      } else {
        console.error('Error upvoting issue:', error);
      }
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">CivicConnect</div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/issue">Report Issues</Link>
          </li>
          <li>
            <Link to="/trending">Trending Issues</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* Trending Issues Section */}
      <section className="trending-section" id="trending">
        <h2>Trending Issues</h2>
        <div className="issue-card-container">
          {trendingIssues
            .sort((a, b) => b.votes - a.votes) // Sort issues by votes in descending order
            .map((issue) => (
              <div className="issue-card" key={issue._id}>
                <h3>{issue.title}</h3>
                <p>Reported by {issue.votes} citizens</p>
                {upvotedIssues.has(issue._id) ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span style={{ color: 'green', fontSize: '1.5em' }}>✓</span>
                    <span style={{ fontWeight: 'bold', color: 'green' }}>Upvoted</span>
                  </div>
                ) : (
                  <button
                    className="cta-button"
                    onClick={() => handleUpvote(issue._id)}
                  >
                    Upvote
                  </button>
                )}
              </div>
            ))}
        </div>
      </section>

      <footer id="contact">
        <p>© 2024 CivicConnect. All Rights Reserved.</p>
      </footer>
    </>
  );
}
