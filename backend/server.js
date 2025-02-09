// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { securityMiddleware } = require('./middleware/security');
const errorHandler = require('./middleware/errorHandler');
const postsRouter = require('./routes/posts');

const app = express();

// Add trust proxy configuration
app.set('trust proxy', 1);

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json({ limit: '5mb' }));
app.use(securityMiddleware);

// Routes
app.use('/api/posts', postsRouter);

// Error handling middleware (must be last)
app.use(errorHandler);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));