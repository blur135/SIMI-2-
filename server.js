const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname))); // serve HTML/CSS/JS if needed

app.post('/save', (req, res) => {
  const newData = req.body;
  const filePath = path.join(__dirname, 'users.json');

  let users = [];
  if (fs.existsSync(filePath)) {
    users = JSON.parse(fs.readFileSync(filePath));
  }

  users.push(newData);
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

  res.send('✅ Data saved successfully!');
});

// ✅ FIXED: use process.env.PORT for Railway or default to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
