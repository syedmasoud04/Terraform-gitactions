const express = require('express');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Main endpoint
app.get('/', (req, res) => {
  res.json({
    message: '🚀 Hello from EKS!',
    hostname: os.hostname(),
    platform: os.platform(),
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// API info endpoint
app.get('/api/info', (req, res) => {
  res.json({
    app: 'EKS Demo Application',
    version: process.env.APP_VERSION || '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    kubernetes: {
      pod: os.hostname(),
      nodeEnv: process.env.NODE_ENV
    }
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
