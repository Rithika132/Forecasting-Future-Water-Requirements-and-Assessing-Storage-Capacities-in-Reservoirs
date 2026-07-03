// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const { forecast } = require('./engine.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));         // serves index.html, about.html, style.css, script.js, etc.
app.use('/public', express.static(path.join(__dirname, 'public')));

// GET historical usage data
app.get('/api/history', (req, res) => {
  fs.readFile(path.join(__dirname, 'history.json'), 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Could not read history.json' });
    res.json(JSON.parse(data));
  });
});

// GET forecast for the next N periods (default 4)
app.get('/api/forecast', (req, res) => {
  const periods = parseInt(req.query.periods, 10) || 4;

  fs.readFile(path.join(__dirname, 'history.json'), 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Could not read history.json' });

    const { records } = JSON.parse(data);
    const predicted = forecast(records, periods);
    res.json({ history: records, forecast: predicted });
  });
});

// POST contact form submissions
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'name, email, and message are required' });
  }
  console.log('New contact message:', { name, email, message });
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Water Forecasting server running at http://localhost:${PORT}`);
});