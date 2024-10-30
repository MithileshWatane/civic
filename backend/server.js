const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());


// Import routes
const userRoutes = require('./routes/userRoutes'); // Create userRoutes.js
const governmentRoutes = require('./routes/governmentRoutes'); // Create governmentRoutes.js
const issueRoutes = require('./routes/issueRoutes'); // Create issueRoutes.js
const communityRoutes = require('./routes/communityRoutes'); // Create communityRoutes.js
const authRoutes =  require('./routes/authRoutes'); // Create authRoutes.js


// Use routes
app.use('/api/users', userRoutes);
app.use('/api/government', governmentRoutes);
app.use('/api/issues', issueRoutes);
app.use('/api/community', communityRoutes); 
app.use('/api/register' , authRoutes)

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
