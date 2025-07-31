const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve the ports.html file directly
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'ports.html'));
});

// Save form data to users.json
app.post('/save', (req, res) => {
  const userData = req.body;

  // Read existing data
  fs.readFile('users.json', 'utf8', (err, data) => {
    let users = [];
    if (!err && data) {
      users = JSON.parse(data);
    }

    // Add new user
    users.push(userData);

    // Save updated data
    fs.writeFile('users.json', JSON.stringify(users, null, 2), err => {
      if (err) {
        res.status(500).send('❌ Failed to save data');
      } else {
        res.send('✅ Registration saved!');
      }
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
