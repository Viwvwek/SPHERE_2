const bcrypt = require('bcryptjs');

const users = [
  {
    id: '1',
    email: 'user@example.com',
    password: bcrypt.hashSync('password123', 10),
    name: 'John Doe',
  }
];

module.exports = users;
