import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import './styles/dashboard.css';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Download } from 'lucide-react'; // Make sure to import Download icon


export default function Dashboard() {
  const [role, setRole] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [text, setText] = useState("");

  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [uniqueTitles, setUniqueTitles] = useState(null);
  const [issueCounts, setIssueCounts] = useState({
    total: 0,
    reported: 0,
    inProgress: 0,
    resolved: 0,
  });
  const [modalData, setModalData] = useState(null);
  const [estimatedCompletion, setEstimatedCompletion] = useState('');
  const [inProgressDescription, setInProgressDescription] = useState(''); // New state for in-progress description
  const [resolvedDescription, setResolvedDescription] = useState(''); // New state for resolved description
  const [progressLogs, setProgressLogs] = useState({});
  const [expandedComplaints, setExpandedComplaints] = useState({});



  const generatePDFReport = () => {
    // Create a new jsPDF instance with higher resolution
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });
  
    // Color Palette
    const colors = {
      primary: '#007bff',
      secondary: '#6c757d',
      background: '#f4f6f9',
      text: '#333333',
      headerBackground: '#e9ecef'
    };
  
    // Helper function to add header
    const addHeader = () => {
      // Background rectangle for header
      doc.setFillColor(colors.primary);
      doc.rect(0, 0, 297, 20, 'F');
      
      // Title
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('CivicConnect - Comprehensive Issue Report', 10, 14);
      
      // Date and Time
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.text(new Date().toLocaleString(), 250, 14, { align: 'right' });
    };
  
    // Helper function to add summary statistics
    const addSummaryStatistics = (yPosition) => {
      doc.setFillColor(colors.headerBackground);
      doc.rect(10, yPosition, 277, 20, 'F');
  
      doc.setTextColor(colors.text);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      
      const summaryText = `Total Issues: ${issueCounts.total} | ` +
                          `Reported: ${issueCounts.reported} | ` +
                          `In Progress: ${issueCounts.inProgress} | ` +
                          `Resolved: ${issueCounts.resolved}`;
      
      doc.text(summaryText, 10, yPosition + 13, { align: 'left' });
      
      return yPosition + 25;
    };
  
    // Prepare data with enhanced details
    const reportData = filteredComplaints.map(complaint => {
      const progressLog = progressLogs[complaint._id] || {};
      
      // Enhanced detail extraction
      const getStatusDetails = () => {
        switch(complaint.status) {
          case 'reported':
            return {
              processingDetails: `Reported on: ${new Date(progressLog.reportedDate || complaint.createdAt).toLocaleString()}`,
              additionalInfo: 'Awaiting initial review'
            };
          case 'in progress':
            return {
              processingDetails: `
                Reported: ${new Date(progressLog.reportedDate || complaint.createdAt).toLocaleString()}
                In Progress: ${new Date(progressLog.inProgressDate).toLocaleString()}
                Officer: ${progressLog.officerName || 'Unassigned'}
              `,
              additionalInfo: progressLog.inProgressDescription || 'No progress description'
            };
          case 'resolved':
            return {
              processingDetails: `
                Reported: ${new Date(progressLog.reportedDate || complaint.createdAt).toLocaleString()}
                In Progress: ${new Date(progressLog.inProgressDate).toLocaleString()}
                Resolved: ${new Date(progressLog.resolvedDate).toLocaleString()}
                Officer: ${progressLog.officerName || 'Unassigned'}
              `,
              additionalInfo: progressLog.resolvedDescription || 'No resolution details'
            };
          default:
            return {
              processingDetails: 'No processing information',
              additionalInfo: 'No additional details'
            };
        }
      };
  
      const statusDetails = getStatusDetails();
  
      return [
        complaint._id,
        complaint.title,
        complaint.location,
        complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1),
        statusDetails.processingDetails,
        statusDetails.additionalInfo
      ];
    });
  
    // Add header
    addHeader();
  
    // Add summary statistics
    let yPosition = addSummaryStatistics(25);
  
    // Create table with enhanced styling
    autoTable(doc, {
      startY: yPosition,
      head: [
        ['Issue ID', 'Title', 'Location', 'Status', 'Processing Details', 'Additional Information']
      ],
      body: reportData,
      theme: 'striped',
      styles: { 
        fontSize: 8,
        cellPadding: 3,
        textColor: colors.text,
        lineColor: colors.secondary
      },
      headStyles: {
        fillColor: colors.primary,
        textColor: 255,
        fontSize: 10
      },
      alternateRowStyles: {
        fillColor: colors.background
      },
      columnStyles: {
        4: { cellWidth: 'auto' },
        5: { cellWidth: 'auto' }
      }
    });
  
    // Add footer
    doc.setTextColor(colors.secondary);
    doc.setFontSize(8);
    doc.text('Generated by CivicConnect', 10, doc.internal.pageSize.height - 10);
    doc.text(`${new Date().toLocaleString()}`, 250, doc.internal.pageSize.height - 10, { align: 'right' });
  
    // Save the PDF
    doc.save(`CivicConnect_Comprehensive_Report_${new Date().toISOString().replace(/:/g, '-')}.pdf`);
  };


  const generateDetailedIssuePDF = (complaint) => {
    // Create a new jsPDF instance with higher resolution
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
  
    // Color Palette
    const colors = {
      primary: '#007bff',
      secondary: '#6c757d',
      background: '#f4f6f9',
      text: '#333333'
    };
  
    // Helper function to add header
    const addHeader = () => {
      // Background rectangle
      doc.setFillColor(colors.primary);
      doc.rect(0, 0, 210, 20, 'F');
      
      // Logo or Title
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('CivicConnect - Detailed Issue Report', 10, 14);
      
      // Date
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.text(new Date().toLocaleDateString(), 160, 14);
    };
  
    // Helper function to add section header
    const addSectionHeader = (text, yPosition) => {
      doc.setDrawColor(colors.primary);
      doc.setLineWidth(0.5);
      doc.line(10, yPosition, 200, yPosition);
      
      doc.setTextColor(colors.primary);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(text, 10, yPosition + 7);
      
      return yPosition + 10;
    };
  
    // Helper function to add detail row
    const addDetailRow = (label, value, yPosition, isImportant = false) => {
      doc.setFont('helvetica', isImportant ? 'bold' : 'normal');
      doc.setTextColor(colors.text);
      doc.setFontSize(10);
      
      // Label
      doc.text(label + ':', 20, yPosition);
      
      // Value with word wrapping
      doc.setFont('helvetica', 'normal');
      const splitValue = doc.splitTextToSize(value || 'Not Specified', 160);
      doc.text(splitValue, 70, yPosition);
      
      return yPosition + (splitValue.length * 5) + 5;
    };
  
    // Fetch the corresponding progress log
    const progressLog = progressLogs[complaint._id] || {};
  
    // Start PDF Generation
    addHeader();
  
    // Issue Details Section
    let yPosition = 30;
    yPosition = addSectionHeader('Issue Information', yPosition);
  
    // Basic Issue Details
    yPosition += 5;
    yPosition = addDetailRow('Issue ID', complaint._id, yPosition, true);
    yPosition = addDetailRow('Title', complaint.title, yPosition, true);
    yPosition = addDetailRow('Description', complaint.description, yPosition);
    yPosition = addDetailRow('Location', complaint.location, yPosition);
    yPosition = addDetailRow('Current Status', 
      complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1), 
      yPosition, true
    );
  
    // Progress Timeline Section
    yPosition = addSectionHeader('Progress Timeline', yPosition + 5);
    yPosition += 5;
  
    // Timeline Details
    yPosition = addDetailRow('Reported Date', 
      progressLog.reportedDate 
        ? new Date(progressLog.reportedDate).toLocaleString() 
        : 'Not Available', 
      yPosition
    );
    yPosition = addDetailRow('Officer Name', 
      progressLog.officerName || 'Not Specified', 
      yPosition, true
    );
    yPosition = addDetailRow('In Progress Date', 
      progressLog.inProgressDate 
        ? new Date(progressLog.inProgressDate).toLocaleString() 
        : 'Not Applicable', 
      yPosition
    );
    yPosition = addDetailRow('Resolved Date', 
      progressLog.resolvedDate 
        ? new Date(progressLog.resolvedDate).toLocaleString() 
        : 'Not Resolved', 
      yPosition
    );
  
    // Descriptions Section
    yPosition = addSectionHeader('Detailed Descriptions', yPosition + 5);
    yPosition += 5;
  
    // Progress and Resolution Descriptions
    yPosition = addDetailRow('Progress Description', 
      progressLog.inProgressDescription || 'No progress description provided', 
      yPosition
    );
    yPosition = addDetailRow('Resolution Description', 
      progressLog.resolvedDescription || 'No resolution description provided', 
      yPosition
    );
  
    // Footer
    doc.setDrawColor(colors.secondary);
    doc.setLineWidth(0.3);
    doc.line(10, 280, 200, 280);
    doc.setTextColor(colors.secondary);
    doc.setFontSize(8);
    doc.text('Generated by CivicConnect', 10, 290);
    doc.text(`${new Date().toLocaleString()}`, 160, 290);
  
    // Save the PDF
    doc.save(`Issue_${complaint._id}_Detailed_Report_${new Date().toISOString().replace(/:/g, '-')}.pdf`);
  };



  const toggleComplaintDetails = (complaintId) => {
    setExpandedComplaints(prev => ({
      ...prev,
      [complaintId]: !prev[complaintId]
    }));
  };
  const bufferToBase64 = (buffer) => {
    const binary = new Uint8Array(buffer).reduce((acc, byte) => acc + String.fromCharCode(byte), '');
    return btoa(binary);
  };

  const [modalImage, setModalImage] = useState(null);

  const openModal = (image) => setModalImage(image);
  const closeModal = () => setModalImage(null);

  const allStatuses = ['all', 'in progress', 'resolved', 'reported'];
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

  const fetchComplaints = async () => {
    const token = localStorage.getItem("token");
  
    try {
      const response = await fetch("http://localhost:5000/api/governmentid/reported-issues", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch complaints");
      }
  
      const data = await response.json();
  
      if (Array.isArray(data.issues)) {
        setComplaints(data.issues);
        setFilteredComplaints(data.issues);
  
        // Compute issue counts
        const reported = data.issues.filter((c) => c.status === "reported").length;
        const inProgress = data.issues.filter((c) => c.status === "in progress").length;
        const resolved = data.issues.filter((c) => c.status === "resolved").length;
        setIssueCounts({ total: data.issues.length, reported, inProgress, resolved });
  
        // Extract unique titles
        setUniqueTitles([...new Set(data.issues.map((c) => c.title))]);
  
        // Fetch progress logs **after setting complaints**
        fetchProgressLogs(data.issues);
      }
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };
  
  const fetchProgressLogs = async (complaints) => {
    if (!complaints.length) return;
  
    try {
      const response = await fetch("http://localhost:5000/api/get-progress-log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ issueIds: complaints.map((c) => c._id) }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch progress logs");
      }
  
      const progressData = await response.json();
  
      // Map progress logs by issue ID
      const logs = progressData.reduce((acc, log) => {
        acc[log.issueId] = log;
        return acc;
      }, {});
  
      setProgressLogs(logs);
    } catch (error) {
      console.error("Error fetching progress logs:", error);
    }
  };
  

  const chartData = [
    { name: 'Reported', count: issueCounts.reported },
    { name: 'In Progress', count: issueCounts.inProgress },
    { name: 'Resolved', count: issueCounts.resolved },
  ];
  useEffect(() => {
    // ✅ Fetch role from localStorage when Dashboard loads
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setRole(storedRole); // Set state with stored role
    }
  }, []); 

  useEffect(() => {
    fetchComplaints(); // Fetch complaints on component mount
  }, []);

  useEffect(() => {
    filterComplaintsByStatus(statusFilter); // Apply status filter whenever it changes
  }, [statusFilter, complaints]);

  const filterComplaintsByStatus = (status) => {
    const filtered = complaints.filter((c) => status === 'all' || c.status === status);
    setFilteredComplaints(filtered);
    setSelectedTitle(null);
  };

  const filterComplaintsByTitle = (title) => {
    if (selectedTitle === title) {
      setSelectedTitle(null);
      filterComplaintsByStatus(statusFilter);
    } else {
      const filtered = complaints.filter((c) => c.title === title);
      setFilteredComplaints(filtered);
      setSelectedTitle(title);
    }
  };

  const changeStatus = async (id, newStatus) => {
    const token = localStorage.getItem('token');
    const complaint = complaints.find((c) => c._id === id);

    if (!complaint) {
      console.error('Complaint not found:', id);
      return;
    }

    if (complaint.status === 'reported' && newStatus === 'in progress') {
      setModalData({
        issueId: id,
        title: complaint.title || 'Untitled',
        reportedDate: complaint.createdAt || new Date().toISOString(),
        authorityName: complaint.governmentAuthority.name,
        inProgressDate: new Date().toISOString(),
        type: 'inProgress',
      });
      return;
    }

    if (complaint.status === 'in progress' && newStatus === 'resolved') {
      try {
        const response = await fetch(`http://localhost:5000/api/issues/progress-log/${id}`, {
          method: 'GET',
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });

        const logData = await response.json();

        setModalData({
          issueId: id,
          title: complaint.title || 'Untitled',
          reportedDate: complaint.createdAt || new Date().toISOString(),
          authorityName: localStorage.getItem('username') || 'Unknown',
          inProgressDate: logData.inProgressDate || complaint.inProgressDate || new Date().toISOString(),
          resolvedDate: new Date().toISOString(),
          type: 'resolved',
        });
      } catch (error) {
        console.error('Error fetching progress log:', error);
        setModalData({
          issueId: id,
          title: complaint.title || 'Untitled',
          reportedDate: complaint.createdAt || new Date().toISOString(),
          authorityName: localStorage.getItem('username') || 'Unknown',
          inProgressDate: complaint.inProgressDate || new Date().toISOString(),
          resolvedDate: new Date().toISOString(),
          type: 'resolved',
        });
      }
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/issues/modify/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) throw new Error('Failed to update status');
      fetchComplaints();
    } catch (error) {
      console.error('Error changing status:', error);
    }
  };

  const handleModalSubmit = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Authentication token missing. Please log in again.');
      return;
    }
    if (!modalData || !modalData.issueId || !modalData.title) {
      alert('Error: Incomplete data. Please try again.');
      return;
    }

    const basePayload = {
      issueId: modalData.issueId,
      title: modalData.title,
      reportedDate: modalData.reportedDate,
      authorityName: modalData.authorityName,
      officerName: text, // Use the text state to set officerName
    };

    let payload;
    if (modalData.type === 'inProgress') {
      payload = { 
        ...basePayload, 
        inProgressDate: modalData.inProgressDate, 
        estimatedCompletion, 
        inProgressDescription, // Store in-progress description
        status: 'in progress' 
      };
    } else if (modalData.type === 'resolved') {
      payload = { 
        ...basePayload, 
        inProgressDate: modalData.inProgressDate, 
        resolvedDate: modalData.resolvedDate, 
        resolvedDescription, // Store resolved description
        status: 'resolved' 
      };
    } else {
      alert('Error: Invalid status transition.');
      return;
    }

    try {
      const statusResponse = await fetch(`http://localhost:5000/api/issues/modify/${modalData.issueId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: payload.status }),
      });

      const statusData = await statusResponse.json();
      if (!statusResponse.ok) {
        throw new Error(statusData.message || 'Failed to update issue status');
      }

      const logResponse = await fetch('http://localhost:5000/api/issues/progress-log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const logData = await logResponse.json();
      if (!logResponse.ok) {
        throw new Error(logData.message || 'Failed to save progress log');
      }

      setModalData(null);
      setEstimatedCompletion('');
      setInProgressDescription(''); // Reset in-progress description
      setResolvedDescription(''); // Reset resolved description
      fetchComplaints();
    } catch (error) {
      console.error('Error submitting modal data:', error);
      alert(`An error occurred: ${error.message}`);
    }
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo">
          Civic<span style={{ color: 'blue' }}>Connect</span>
        </Link>
        <ul>
        <button 
            onClick={generatePDFReport} 
            className="download-report-btn"
          >
            <Download size={20} /> 
            Download PDF Report
          </button>
          <li><Link to="/">Home</Link></li>
        </ul>
        
      </nav>
      <section className="dashboard">
      <h1>Authority Dashboard</h1>
     

      <div className="bc">
        <div className="a">
        <div className="visualization-section">
  <h2>Issue Overview</h2>
  <div className="charts">
    {/* Bar Chart */}
    <div className="bar-chart">
      <h3>Issue Counts</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <defs>
            <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.8} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            contentStyle={{ backgroundColor: '#f4f4f4', border: 'none', borderRadius: '8px' }}
            itemStyle={{ fontSize: '12px' }}
            formatter={(value) => [`${value} Issues`, 'Count']}
          />
          <Bar dataKey="count" fill="url(#colorBar)" radius={[10, 10, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
    {/* Doughnut Chart */}
    <div className="pie-chart">
      <h3>Issue Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="count"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={5}
            fill="#82ca9d"
            label={({ name, count }) => `${name}: ${count}`}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: '#f4f4f4', border: 'none', borderRadius: '8px' }}
            formatter={(value, name) => [`${value} Issues`, name]}
          />
          <Legend iconSize={10} layout="horizontal" verticalAlign="bottom" align="center" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
</div>
</div>

        
        <div className="b">
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
          <div className="titles-section">{/* Titles Section (unchanged) */}</div>
          <div id="complaintsContainer" className="complaints-container">
        <h2>Complaint Details</h2>
        {filteredComplaints.length > 0 ? (
          [...filteredComplaints]
            .sort((a, b) => (a.flags || 0) - (b.flags || 0))
            .map((complaint) => {
              const progressLog = progressLogs[complaint._id];
              const isExpanded = expandedComplaints[complaint._id];

              return (
                <div key={complaint._id} className="complaint-card">
                  <div style={{ flex: 1 }}>
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
                          {allStatuses.filter((s) => s !== "all").map((status) => (
                            <option key={status} value={status}>
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </option>
                          ))}
                        </select>
                        
                    <div > </div>

                    <button 
                      onClick={() => toggleComplaintDetails(complaint._id)}
                      className="show-details-btn"
                    >
                      {isExpanded ? 'Hide Details' : 'Show Details'}
                    </button>

                    {isExpanded && (
                      <div className="complaint-details-expanded">
                        

                        {/* Show appropriate details based on status */}
                        {progressLog && (
                          <div className="progress-details">
                            <p><strong>Reported Date:</strong> {new Date(progressLog.reportedDate).toLocaleString()}</p>
                            
                            {progressLog.status === "in progress" && (
                              <>
                                <p><strong>In Progress Date:</strong> {new Date(progressLog.inProgressDate).toLocaleString()}</p>
                                <p><strong>Progress Description:</strong> {progressLog.inProgressDescription}</p>
                                <p><strong>officerName:</strong> {progressLog.officerName}</p>

                              </>
                            )}

                            {progressLog.status === "resolved" && (
                              <>
                                <p><strong>In Progress Date:</strong> {new Date(progressLog.inProgressDate).toLocaleString()}</p>
                                <p><strong>Progress Description:</strong> {progressLog.inProgressDescription}</p>
                                <p><strong>officerName:</strong> {progressLog.officerName}</p>
                                <p><strong>Resolved Date:</strong> {new Date(progressLog.resolvedDate).toLocaleString()}</p>
                                <p><strong>Resolution Details:</strong> {progressLog.resolvedDescription}</p>
                              </>
                            )}
                          </div>
                        )}
                         {complaint.flags > 1 && (
  <p style={{ 
    backgroundColor: 'white', 
    color: 'red', 
    padding: '5px 10px', 
    borderRadius: '4px', 
    marginTop: '8px',
  }}>
    <strong>Warning:</strong> Complaint flagged by {complaint.flags} {complaint.flags === 1 ? 'person' : 'people'}.
  </p>
)}

{/* New: Show Flagged Reasons for Authorities */}
{role === 'government' && complaint.flaggedReasons?.length > 0 && (
  <div style={{ backgroundColor: '#fff3f3', padding: '10px', borderRadius: '5px', marginTop: '10px' }}>
    <strong>🚨 Flagged Reasons:</strong>
    <ul>
      {complaint.flaggedReasons.map((entry, index) => (
        <li key={index} style={{ fontSize: '0.9em', color: '#ff4d4d' }}>
          <strong>{entry.user}</strong>: {entry.reason} 
          {entry.flaggedAt ? <em> ({new Date(entry.flaggedAt).toLocaleString()})</em> : null}
        </li>
      ))}
      </ul>
      </div>
)}
                        
                      </div>
                    )}
                    <button 
      onClick={() => generateDetailedIssuePDF(complaint)}
      className="download-report-btn"
      >
      Download Detailed Report
    </button>
                  </div>
                </div>
              );
            })
        ) : (
          <p>No complaints found for the selected title.</p>
        )}
      </div>
        </div>
      </div>
    </section>
      {/* Modal for "In Progress" or "Resolved" status change */}
      {modalData && (
  <div className="modal-overlay">
    <div className="modal-container">
      <div className="modal-header">
        <h2>{modalData.type === 'inProgress' ? 'Update Issue to In Progress' : 'Resolve Issue'}</h2>
        <button 
          className="modal-close-btn" 
          onClick={() => {
            setModalData(null);
            setInProgressDescription('');
            setResolvedDescription('');
            setEstimatedCompletion('');
          }}
        >
          ×
        </button>
      </div>

      <div className="modal-content">
        <div className="modal-detail">
          <p><strong>Issue Title:</strong> {modalData.title}</p>
          <p><strong>Issue ID:</strong> {modalData.issueId}</p>
          <p><strong>Reported Date:</strong> {new Date(modalData.reportedDate).toLocaleString()}</p>
          <p><strong>Authority Name:</strong> {modalData.authorityName}</p>
        </div>

        {modalData.type === 'inProgress' ? (
          <div className="modal-input-group">
            <p className="modal-detail">
              <strong>In Progress Date:</strong> {new Date(modalData.inProgressDate).toLocaleString()}
            </p>
            <label>
              Estimated Completion Date:
              <input
                type="date"
                value={estimatedCompletion}
                onChange={(e) => setEstimatedCompletion(e.target.value)}
                required
              />
            </label>
            <label>
            officerName:
              <textarea
      value={text}
      onChange={(e) => setText(e.target.value)}
                required
                rows="4"
              />
            </label>
            <label>
              In Progress Description:
              <textarea
                value={inProgressDescription}
                onChange={(e) => setInProgressDescription(e.target.value)}
                placeholder="Enter a brief description for in-progress status"
                required
                rows="4"
              />
            </label>
          </div>
        ) : (
          <div className="modal-input-group">
            <p className="modal-detail">
              <strong>In Progress Date:</strong> {new Date(modalData.inProgressDate).toLocaleString()}
              <br />
              <strong>Resolved Date:</strong> {new Date(modalData.resolvedDate).toLocaleString()}
            </p>
            <label>
              Resolved Description:
              <textarea
                value={resolvedDescription}
                onChange={(e) => setResolvedDescription(e.target.value)}
                placeholder="Enter a brief description for resolved status"
                required
                rows="4"
              />
            </label>
          </div>
        )}

        <div className="modal-actions">
          <button 
            className="modal-btn modal-btn-cancel"
            onClick={() => {
              setModalData(null);
              setInProgressDescription('');
              setResolvedDescription('');
              setEstimatedCompletion('');
            }}
          >
            Cancel
          </button>
          <button 
            className="modal-btn modal-btn-submit"
            onClick={handleModalSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
)}

      {modalImage && (
        <div className="modal" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '10px', zIndex: 1000 }}>
          <img src={modalImage} alt="Complaint" style={{ maxWidth: '100%', maxHeight: '80vh' }} />
          <button onClick={closeModal}>Close</button>
        </div>
      )}
      <footer>
        <p>© 2025 CivicConnect. All Rights Reserved.</p>
      </footer>
    </>
  );
}