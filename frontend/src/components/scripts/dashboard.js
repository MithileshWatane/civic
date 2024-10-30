// Sample complaints data (you can replace this with data fetched from your backend API)
const complaints = [
    { id: 1, domain: 'Road safty', description: 'Potholes on Main Street', status: 'pending' },
    { id: 2, domain: 'Garbage', description: 'Overflowing bins at the park', status: 'in-progress' },
    { id: 3, domain: 'Electricity', description: 'Streetlights not working on Elm Road', status: 'resolved' },
    { id: 4, domain: 'Water supply', description: 'Water leakage near Market Street', status: 'pending' },
    { id: 5, domain: 'Animal related', description: 'Stray dog near school area', status: 'resolved' },
  ];
  
  // Elements from the HTML
  const complaintsContainer = document.getElementById('complaintsContainer');
  const statusFilter = document.getElementById('statusFilter');
  const categoryButtons = document.querySelectorAll('.category-btn');
  
  // Load complaints dynamically based on filters
  function loadComplaints(domain = 'all', status = 'all') {
    complaintsContainer.innerHTML = ''; // Clear the existing complaints
  
    const filteredComplaints = complaints.filter((complaint) => {
      const matchesDomain = domain === 'all' || complaint.domain === domain;
      const matchesStatus = status === 'all' || complaint.status === status;
      return matchesDomain && matchesStatus;
    });
  
    if (filteredComplaints.length === 0) {
      complaintsContainer.innerHTML = '<p>No complaints found.</p>';
    } else {
      filteredComplaints.forEach((complaint) => {
        const complaintCard = document.createElement('div');
        complaintCard.className = 'complaint-card';
        complaintCard.innerHTML = `
          <h3>${complaint.domain.charAt(0).toUpperCase() + complaint.domain.slice(1)}</h3>
          <p>${complaint.description}</p>
          <p class="complaint-status">Status: ${complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}</p>
        `;
        complaintsContainer.appendChild(complaintCard);
      });
    }
  }
  
  // Initialize the dashboard with all complaints
  loadComplaints();
  
  // Event listener for status filter dropdown
  statusFilter.addEventListener('change', (e) => {
    const selectedStatus = e.target.value;
    loadComplaints('all', selectedStatus);
  });
  
  // Event listeners for category buttons
  categoryButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const selectedDomain = e.target.dataset.domain;
      loadComplaints(selectedDomain, statusFilter.value);
    });
  });
  