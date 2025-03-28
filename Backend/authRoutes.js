const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { authenticate } = require('./middleware');
const users = require('./users');

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET;

// Login Route
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
});

// Protected Profile Route
router.get('/profile', authenticate, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json({ id: user.id, email: user.email, name: user.name });
});

module.exports = router;
