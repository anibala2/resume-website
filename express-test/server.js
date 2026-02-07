const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.json({
    message: 'Express server is running!',
    nodeVersion: process.version,
    expressVersion: require('express/package.json').version,
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});