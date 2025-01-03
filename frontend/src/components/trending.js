import React, { useEffect, useState } from 'react';
import './styles/trending.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Trending() {
  const [trendingIssues, setTrendingIssues] = useState([]);
  const [upvotedIssues, setUpvotedIssues] = useState(new Set());

  useEffect(() => {
    const storedUpvotedIssues = JSON.parse(localStorage.getItem('upvotedIssues')) || [];
    setUpvotedIssues(new Set(storedUpvotedIssues));
  }, []);

  useEffect(() => {
    const fetchTrendingIssues = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/issues/get');
        setTrendingIssues(response.data.issues);
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
        { upvote: true },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      setTrendingIssues((prevIssues) =>
        prevIssues.map((issue) =>
          issue._id === issueId ? { ...issue, votes: response.data.votes } : issue
        )
      );

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
        </ul>
      </nav>

      <section className="trending-section" id="trending">
        <h2>Trending Issues</h2>
        <div className="issue-card-container">
          {trendingIssues
            .sort((a, b) => b.votes - a.votes)
            .map((issue, index) => (
              <div className="issue-card" key={issue._id}>
                {index === 0 && (
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/12225/12225836.png"
                    alt="Trending"
                    className="trending-icon"
                  />
                )}
                <h3  style={{ color: 'black' }}>
                  #{index + 1} {issue.title}
                </h3>
                <p>Reported by {issue.votes} citizens</p>
                <p>{issue.description}</p>
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
