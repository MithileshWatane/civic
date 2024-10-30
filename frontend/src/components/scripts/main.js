// JavaScript for CivicConnect

// Handle Complaint Submission
document.addEventListener('DOMContentLoaded', () => {
    const complaintForm = document.getElementById('complaintForm');
  
    complaintForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const category = document.getElementById('category').value;
      const description = document.getElementById('description').value;
      const location = document.getElementById('location').value;
  
      if (description.trim() === '') {
        alert('Please provide a valid complaint description.');
        return;
      }
  
      // Display confirmation (In a real project, connect to backend here)
      alert(`Complaint submitted in the "${category}" domain. Thank you!`);
  
      // Reset the form
      complaintForm.reset();
    });
  });
  