import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Map from './map';
import './styles/trending.css';

export default function Trending() {
  const [trendingIssues, setTrendingIssues] = useState([]);
  const [userId, setUserId] = useState(null);
  const [issues, setIssues] = useState([]);
  const [modalImage, setModalImage] = useState(null);

  // Function to convert buffer to base64 string
  const bufferToBase64 = (buffer) => {
    const binary = new Uint8Array(buffer).reduce((acc, byte) => acc + String.fromCharCode(byte), '');
    return btoa(binary);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.id);
    }
  }, []);

  useEffect(() => {
    const fetchTrendingIssues = async () => {
      try {
        const token = localStorage.getItem('token');

        // Fetch trending issues
        const response = await axios.get('http://localhost:5000/api/issues/get', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTrendingIssues(response.data.issues);

        // Fetch user's reported issues
        const issuesResponse = await axios.get('http://localhost:5000/api/issues/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIssues(issuesResponse.data.issues);
      } catch (error) {
        console.error('Error fetching issues:', error);
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

      // Update the state to reflect the new votes and upvotedBy data
      setTrendingIssues((prevIssues) =>
        prevIssues.map((issue) =>
          issue._id === issueId
            ? {
                ...issue,
                votes: response.data.votes,
                upvotedBy: [...issue.upvotedBy, userId],
              }
            : issue
        )
      );
    } catch (error) {
      console.error('Error upvoting issue:', error);
    }
  };

  // Get issue category from title
  const getIssueCategory = (title) => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('pothole') || titleLower.includes('road') || titleLower.includes('bridge')) {
      return 'Infrastructure';
    } else if (titleLower.includes('light') || titleLower.includes('safety') || titleLower.includes('crime')) {
      return 'Public Safety';
    } else if (titleLower.includes('garden') || titleLower.includes('park') || titleLower.includes('community')) {
      return 'Community Project';
    }
    return 'Infrastructure'; // Default
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Infrastructure':
        return '⚠️';
      case 'Public Safety':
        return '⚡';
      case 'Community Project':
        return '🌐';
      default:
        return '📋';
    }
  };

  // Get priority based on votes
  const getIssuePriority = (votes) => {
    if (votes >= 2) return 'HIGH PRIORITY';
    if (votes >= 1) return 'MEDIUM PRIORITY';
    return 'COMMUNITY PROJECT';
  };

  // Get sample image URL based on category
  const getSampleImage = (category) => {
    switch (category) {
      case 'Infrastructure':
        return 'https://images.unsplash.com/photo-1601024445121-e5b82f020549?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
      case 'Public Safety':
        return 'https://images.unsplash.com/photo-1573455494060-c5595004fb6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
      case 'Community Project':
        return 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
      default:
        return 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
    }
  };

  // Get image URL
  const getImageUrl = (issue) => {
    if (issue.images?.length > 0) {
      const img = issue.images[0];
      const base64Image = bufferToBase64(img.data.data);
      return `data:${img.contentType};base64,${base64Image}`;
    }
    return getSampleImage(getIssueCategory(issue.title));
  };

  // Get location name
  const getLocationName = (issue) => {
    return issue.location || 'Multiple Locations';
  };

 // Replace the current getProgressPercentage function with this:
const getProgressPercentage = (issue) => {
  // For community projects, calculate progress as a percentage of target votes
  if (getIssueCategory(issue.title) === 'Community Project') {
    // Assuming community projects need at least 300 votes to be fully funded
    const targetVotes = 300;
    return Math.min(Math.round((issue.votes / targetVotes) * 100), 100);
  }
  
  // For infrastructure and safety issues, calculate based on votes and age
  const ageInDays = Math.floor((new Date() - new Date(issue.createdAt)) / (1000 * 60 * 60 * 24));
  
  // Weight by status - give more progress based on status
  let statusWeight = 0;
  if (issue.status === 'in-progress') {
    statusWeight = 40;
  } else if (issue.status === 'acknowledged') {
    statusWeight = 20;
  }
  
  // Calculate weighted progress (age gives up to 30%, votes give up to 30%, status gives up to 40%)
  const ageProgress = Math.min(ageInDays / 30, 1) * 30; // Max 30% from age (capped at 30 days)
  const voteProgress = Math.min(issue.votes / 200, 1) * 30; // Max 30% from votes (capped at 200)
  
  // Total progress percentage
  return Math.min(Math.round(ageProgress + voteProgress + statusWeight), 100);
};

 
  return (
    <div className="trending-container">
      <div className="trending-header">
        <h1>Current <span className="text-orange">Trending</span> Issues in <span className="text-blue">Communities</span></h1>
        <p>Stay informed about the most pressing concerns affecting neighborhoods across the platform.</p>
      </div>

      <div className="issue-cards-grid">
        {trendingIssues
          .filter((issue) => issue.status !== 'resolved')
          .sort((a, b) => b.votes - a.votes)
          .slice(0, 6) // Limit to 6 cards for better layout
          .map((issue) => {
            const category = getIssueCategory(issue.title);
            const categoryIcon = getCategoryIcon(category);
            const priority = getIssuePriority(issue.votes);
            const progressPercentage = getProgressPercentage(issue);
            const location = getLocationName(issue);
            
            // Generate a random days count for demo purposes
            const calculateDaysAgo = (createdAt) => {
              const creationDate = new Date(createdAt);
              const currentDate = new Date();
              const timeDifference = currentDate - creationDate;
              const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
              
              if (daysDifference === 0) {
                return 'Today';
              } else if (daysDifference === 1) {
                return 'Yesterday';
              } else {
                return `${daysDifference} days ago`;
              }
            };
            
            const timeAgo = calculateDaysAgo(issue.createdAt);            
            return (
              <div className="issue-card" key={issue._id}>
                <div 
                  className="issue-card-image" 
                  style={{ backgroundImage: `url(${getImageUrl(issue)})` }}
                >
                  <div className="issue-card-overlay">
                    <div className="issue-priority-badge" data-priority={priority.toLowerCase().replace(/\s+/g, '-')}>
                      {priority}
                    </div>
                    
                    <div className="issue-meta">
                    <div className="issue-timeframe">
  Reported {timeAgo}
</div>
                      <div className="issue-counts">
                        {issue.votes} reports
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="issue-card-content">
                  <div className="issue-category" data-category={category.toLowerCase().replace(/\s+/g, '-')}>
                    <span className="category-icon">{categoryIcon}</span>
                    <span>{category}</span>
                  </div>
                  
                  <div className="issue-location">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="10" r="3" />
                      <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z" />
                    </svg>
                    <span>{location}</span>
                  </div>
                  
                  <h3 className="issue-title">{issue.title}</h3>
                  <p className="issue-description">{issue.description}</p>
                  
                  <div className="progress-container">
                    <div className="progress-label">
                      {category === 'Community Project' ? 'Resolution in Progress' : 'Resolution in Progress'}
                    </div>
                    
                  
                    
                  </div>
                  
                  <div className="issue-footer">
                  <div className="supporters">
  <div className="avatars">
    {/* Generate 3 avatars with random initials */}
    {Array.from({ length: 2 }).map((_, index) => {
      // Generate random initials from A-Z
      const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      
      return (
        <div 
          className="avatar" 
          key={index}
          style={{ 
            backgroundColor: `hsl(${Math.random() * 360}, 70%, 40%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '0.8rem'
          }}
        >
          {randomLetter}
        </div>
      );
    })}
  </div>
  <span>+{Math.max(0, issue.votes )} more</span>
</div>
                    
                    {issue.upvotedBy.includes(userId) ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ color: 'green', fontSize: '1.5em' }}>✓</span>
                <span style={{ fontWeight: 'bold', color: 'green' }}>Upvoted</span>
              </div>
            ) : (
              <button className="cta-button" onClick={() => handleUpvote(issue._id)}>
                Upvote
              </button>
            )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}